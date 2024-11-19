import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';

@Injectable()
export class GymService {
  constructor(
    @Inject('GYM_REPOSITORY')
    private gymRepository: Repository<Gym>,
  ) {}

  async findAll(): Promise<Gym[]> {
    return this.gymRepository.find();
  }

  async create(gym: CreateGymDto): Promise<Gym> {
    return this.gymRepository.save(gym);
  }
}
