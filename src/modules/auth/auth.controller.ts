import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { QRCodeService } from './qrcode.service';
import { UserCreateDto } from './dto/user.create.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly qrCodeService: QRCodeService,
  ) {
  }

  @Get('generate-qr/:memberId')
  async generateQr(@Param('memberId') memberId: string) {
    const token = this.authService.generateQrToken(memberId);
    const qrCode = await this.qrCodeService.generateQrCode(token);
    return { qrCode };
  }

  @Post('login')
  async login(@Body() user: LoginDto) {
    console.log(user);
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() user: UserCreateDto,
  ) {
    return this.authService.register(user);
  }

}
