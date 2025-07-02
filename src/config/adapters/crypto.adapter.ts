import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoAdapter {
  private readonly ENCRYPTION_KEY =
    process.env.ENCRYPTION_KEY || 'your-32-byte-encryption-key';
  private readonly ALGORITHM = 'aes-256-cbc';

  encrypt(data: Float32Array): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.ALGORITHM,
      Buffer.from(this.ENCRYPTION_KEY),
      iv,
    );

    const encrypted = Buffer.concat([
      cipher.update(Buffer.from(data)),
      cipher.final(),
    ]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(encryptedData: string): Float32Array {
    const [iv, encrypted] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      Buffer.from(this.ENCRYPTION_KEY),
      Buffer.from(iv, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]);
    return new Float32Array(decrypted.buffer);
  }
}
