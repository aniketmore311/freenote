import crypto from 'crypto';
import { promisify } from 'util'
const pbkdf2p = promisify(crypto.pbkdf2);

export async function hashPassword(
  password: string
): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000;
  const buff = await pbkdf2p(password, Buffer.from(salt, 'hex'), iterations, 32, "sha512");
  const hash = buff.toString('hex');
  const toStore = `${hash}:${salt}:${iterations}`;
  return toStore;
};

export async function hashString(data: string, salt: string) {
  const buff = await pbkdf2p(data, salt, 100000, 32, 'sha512');
  return buff.toString('hex');
}

export async function isPasswordMatching(password: string, hash: string) {
  const tokens = hash.split(':');
  const passhash = tokens[0];
  const salt = tokens[1];
  const iterations = parseInt(tokens[2]);
  const buff = await pbkdf2p(password, Buffer.from(salt, 'hex'), iterations, 32, "sha512");
  const computedHash = buff.toString('hex');
  if (computedHash === passhash) {
    return true;
  } else {
    return false;
  }
}