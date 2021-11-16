import crypto from 'crypto';

/**
 * @param data - data to be encrypted
 * @param key - hex string representing 32 byte key
 * @param initVector - hex string representing 16 byte init vector
 */
export function encrypt(data: string, key: string, initVector: string) {
  const algorithm = "aes-256-cbc"
  const keyBuff = Buffer.from(key, 'hex');
  const vecBuff = Buffer.from(initVector, 'hex');
  const cipher = crypto.createCipheriv(algorithm, keyBuff, vecBuff);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

/**
 * @param data - data to be decrypted
 * @param key - hex string representing 32 byte key
 * @param initVector - hex string representing 16 byte init vector
 */
export function decrypt(encryptedData: string, key: string, initVector: string) {
  const algorithm = 'aes-256-cbc';
  const keyBuff = Buffer.from(key, 'hex');
  const vecBuff = Buffer.from(initVector, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, keyBuff, vecBuff);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
}