import { RelationMappings } from 'objection';
import { Model } from '../config/Model'
import { decrypt as decryptData, encrypt } from '../lib/encryption';
import { User } from './User'

export interface IPostCreateDto {
  title: string;
  content: string;
  userId: number;
  userKey: string,
  initVector: string,
}

export class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public created_at!: string;
  public updated_at!: string;
  public is_deleted!: boolean;

  //relations
  public user_id!: number;
  public user!: User;

  //static methods
  public static async create(dto: IPostCreateDto) {
    const { title, content, userId, userKey, initVector } = dto;
    const encTitle = encrypt(title, userKey, initVector);
    const encContent = encrypt(content, userKey, initVector);
    const note = await this.query().insertAndFetch({
      user_id: userId,
      title: encTitle,
      content: encContent,
    })
    return note;
  }

  //instance methods
  public getDecryptedFields(userKey: string, initVector: string) {
    return {
      title: decryptData(this.title, userKey, initVector),
      content: decryptData(this.content, userKey, initVector),
    }
  }

  public toRespDto() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    }
  }

  public toDecRespDto(userKey: string, initVector: string) {
    const respDto = this.toRespDto();
    const decRespDto = {
      ...respDto,
      ...this.getDecryptedFields(userKey, initVector)
    }
    return decRespDto;
  }

  public async softDelete() {
    await this.$query().update({
      is_deleted: true
    })
  }

  static tableName = "notes"
  static relationMappings: RelationMappings = {
    user: {
      modelClass: User,
      relation: Model.BelongsToOneRelation,
      join: {
        from: "notes.user_id",
        to: "users.id"
      }
    }
  }
}