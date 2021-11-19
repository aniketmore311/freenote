import { Model } from '../config/Model'
import { RelationMappings } from 'objection'
import { Note } from './Note'
import crypto from 'crypto';
import { promisify } from 'util';
import { decrypt, encrypt } from '../lib/encryption';
import { hashPassword, hashString } from '../lib/password';
import { APIError } from '../lib/APIError'
import { ms } from '../lib/time'
import { config } from '../config/config';

export interface IUserRepDto {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  role: string,
}

export interface IUserToken extends IUserRepDto {
  passwordKey: string,
}

export interface IUserCreateDto {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: string,
}

export class User extends Model {
  //attributes
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public verify_token!: string;
  public verify_token_exp!: Date;
  public is_verified!: boolean;
  public is_forbidden!: boolean;
  public is_deleted!: boolean;
  /**
   * @description hex string representing 16 byte, salt to hash the password_key
   */
  public password_key_salt!: string;
  /**
   * @description user_key encrypted with password_key
   */
  public encrypted_user_key!: string;
  /**
   * @description hex string representing 16 byte initvector. used with password_key to encrypt user_key
   */
  public init_vector!: string;
  public created_at!: string;
  public updated_at!: string;

  // relations
  public notes!: Note[];

  // metadata
  static tableName = "users";
  static relationMappings: RelationMappings = {
    notes: {
      modelClass: Note,
      relation: Model.HasManyRelation,
      join: {
        from: "users.id",
        to: "notes.user_id"
      }

    },
  };

  //static methods
  /**
   * @description create user
   */
  public static async create(dto: IUserCreateDto) {
    // check if email already taken
    const existUser = await this.query().findOne({ email: dto.email, is_deleted: false });
    if (existUser !== undefined) {
      throw APIError.badRequest('email already taken');
    }
    const hash = await hashPassword(dto.password);
    const passKeySalt = crypto.randomBytes(16).toString('hex');
    const passKey = await hashString(dto.password, passKeySalt);
    const userKey = crypto.randomBytes(32).toString('hex');
    const initVector = crypto.randomBytes(16).toString('hex');
    const encUserKey = encrypt(userKey, passKey, initVector);
    const verifyToken = crypto.randomBytes(16).toString('hex');
    const verifyTokenExp = new Date(Date.now() + 15 * ms.MIN);

    const isVerified = config.env.skipEmailVerification == "true" ? true : false;

    const details: Partial<User> = {
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: hash,
      role: dto.role,
      verify_token: verifyToken,
      verify_token_exp: verifyTokenExp,
      is_verified: isVerified,
      init_vector: initVector,
      password_key_salt: passKeySalt,
      encrypted_user_key: encUserKey,
    }
    const res = await this.query().insert(details);
    const user = await this.query().findById(res.id);
    return user;

  }

  // instance methods
  public toRespDto(): IUserRepDto {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      role: this.role,
    }
  }

  async getUserKey(passwordKey: string) {
    const decUserKey = decrypt(this.encrypted_user_key, passwordKey, this.init_vector);
    return decUserKey;
  }

  async verify(token: string) {
    const now = new Date();
    if (this.verify_token !== token) {
      throw APIError.badRequest('invalid token');
    }
    if (now > this.verify_token_exp) {
      throw APIError.badRequest('token expired');
    }
    await this.$query().update(
      {
        is_verified: true
      }
    );
  }

  async ban() {
    await this.$query().update({
      is_forbidden: true,
    })
  }

}