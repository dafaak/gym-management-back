import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GymEntity } from './gym.entity';

@Injectable()
export class GymService {
  constructor(
    @Inject('GYM_REPOSITORY')
    private gymRepository: Repository<GymEntity>,
  ) {}

  async findAll(): Promise<GymEntity[]> {
    return this.gymRepository.find();
  }
}
