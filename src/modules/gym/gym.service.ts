import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';
import { REPOSITORIES } from '../const/repositories';
import { UpdateGymDto } from './dto/update-gym.dto';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';

@Injectable()
export class GymService {
  private readonly logger = new Logger();

  constructor(
    @Inject(REPOSITORIES.gym)
    private gymRepository: Repository<Gym>,
  ) {}

  async findAll(): Promise<Gym[]> {
    return this.gymRepository.find();
  }

  async create(gym: CreateGymDto): Promise<ResponseMessageInterface> {
    try {
      await this.gymRepository.save(gym);
      return { message: 'CREATED', status: true };
    } catch (e) {
      this.logger.error(
        `Error in create method: payload = ${JSON.stringify(gym)}`,
        e.stack,
      );

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    gymId: number,
    gym: UpdateGymDto,
  ): Promise<ResponseMessageInterface> {
    try {
      const updateRes = await this.gymRepository.update({ id: gymId }, gym);

      if (updateRes.affected) {
        return { message: 'UPDATED', status: true };
      }

      throw new BadRequestException({
        message: 'NO GYM FOUND WITH PROVIDED ID',
        status: false,
      });
    } catch (e) {
      this.logger.error(
        `Error in update method: gymId = ${gymId}, payload = ${JSON.stringify(gym)}`,
        e.stack,
      );

      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
