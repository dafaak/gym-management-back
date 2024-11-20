import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { IdParamDto } from '../../common/dto/idParamDto';
import { validate } from 'class-validator';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get()
  findAll() {
    return this.gymService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createGymDto: CreateGymDto) {
    return this.gymService.create(createGymDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param() params: IdParamDto,
    @Body() updateGymDto: UpdateGymDto,
  ) {
    return this.gymService.update(+params.id, updateGymDto);
  }
}
