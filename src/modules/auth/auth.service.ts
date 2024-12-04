import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateQrToken(userId: string): string {
    const payload = {
      id: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 31,
    };
    return this.jwtService.sign(payload);
  }

  validateQrToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new Error('Invalid token');
    }
  }
}
