import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../../config/envs';
import { QRCodeService } from './qrcode.service';
import { DatabaseModule } from '../../config/database/database.module';
import { AUTH_PROVIDERS } from './auth.providers';
import { BcryptAdapter } from '../../config/adapters/bcrypt.adapter';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwtSeed,
      signOptions: { expiresIn: 2678400 },
    }),
    DatabaseModule,
  ],
  providers: [...AUTH_PROVIDERS, AuthService, QRCodeService, BcryptAdapter],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
}
