import { Controller, Get } from '@nestjs/common';
import { GymService } from './gym.service';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}
  @Get()
  findAll() {
    return this.gymService.findAll();
  }
}
