import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptAdapter {
  hash(password: string): string {
    const salt = genSaltSync(10); // You can adjust the salt rounds as needed
    return hashSync(password, salt);
  }

  compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}