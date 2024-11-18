import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';

@Injectable()
export class GymService {
  constructor(
    @Inject('GYM_REPOSITORY')
    private gymRepository: Repository<Gym>,
  ) {}

  async findAll(): Promise<Gym[]> {
    return this.gymRepository.find();
  }
}
