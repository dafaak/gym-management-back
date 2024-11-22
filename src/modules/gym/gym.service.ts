import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';
import { REPOSITORIES } from '../const/repositories';
import { CommonService } from '../../common/classes/common-service.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

@Injectable()
export class GymService extends CommonService<Gym, CreateGymDto, UpdateGymDto> {
  constructor(
    @Inject(REPOSITORIES.gym)
    private gymRepository: Repository<Gym>,
  ) {
    super(gymRepository);
  }
}
