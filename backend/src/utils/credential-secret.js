import crypto from 'crypto';
import { config } from '../config/index.js';

const ALGORITHM = 'aes-256-gcm';
const SECRET_PREFIX = 'v1';

const getEncryptionKey = () => {
  if (!config.credentialEncryptionKey) {
    throw new Error('Missing required environment variable: CREDENTIAL_ENCRYPTION_KEY');
  }

  return crypto.createHash('sha256').update(config.credentialEncryptionKey).digest();
};

export const isEncryptedCredentialSecret = (value = '') =>
  String(value).startsWith(`${SECRET_PREFIX}:`);

export const encryptCredentialSecret = (plainText) => {
  if (isEncryptedCredentialSecret(plainText)) {
    return plainText;
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(plainText), 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return [
    SECRET_PREFIX,
    iv.toString('base64url'),
    authTag.toString('base64url'),
    encrypted.toString('base64url'),
  ].join(':');
};

export const decryptCredentialSecret = (encryptedValue = '') => {
  if (!isEncryptedCredentialSecret(encryptedValue)) {
    return encryptedValue;
  }

  const [, iv, authTag, encrypted] = String(encryptedValue).split(':');
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(iv, 'base64url')
  );

  decipher.setAuthTag(Buffer.from(authTag, 'base64url'));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'base64url')),
    decipher.final(),
  ]).toString('utf8');
};
