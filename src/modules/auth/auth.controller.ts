import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { QRCodeService } from './qrcode.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly qrCodeService: QRCodeService,
  ) {}

  @Get('generate-qr/:memberId')
  async generateQr(@Param('memberId') memberId: string) {
    const token = this.authService.generateQrToken(memberId);
    const qrCode = await this.qrCodeService.generateQrCode(token);
    return { qrCode };
  }
}
