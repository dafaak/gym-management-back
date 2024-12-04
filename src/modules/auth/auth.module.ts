import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../../config/envs';
import { QRCodeService } from './qrcode.service';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwtSeed,
      signOptions: { expiresIn: 2678400 },
    }),
  ],
  providers: [AuthService, QRCodeService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
