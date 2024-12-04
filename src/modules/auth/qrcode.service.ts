import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeService {
  async generateQrCode(data: string): Promise<string> {
    return QRCode.toDataURL(data);
  }
}
