import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Gym } from '../gym/gym.entity';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { ResponseMessageInterface } from '../../common/interface/response-message.interface';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  private readonly logger = new Logger();

  constructor(
    @Inject(REPOSITORIES.branch)
    private branchRepository: Repository<Gym>,
  ) {}

  async findAll(): Promise<Gym[]> {
    return this.branchRepository.find();
  }

  async create(branch: CreateBranchDto): Promise<ResponseMessageInterface> {
    try {
      await this.branchRepository.save(branch);
      return { message: 'CREATED', status: true };
    } catch (e) {
      this.logger.error(
        `Error in create method: payload = ${JSON.stringify(branch)}`,
        e.stack,
      );

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    branchId: number,
    branch: UpdateBranchDto,
  ): Promise<ResponseMessageInterface> {
    try {
      const updateRes = await this.branchRepository.update(
        { id: branchId },
        branch,
      );

      if (updateRes.affected) {
        return { message: 'UPDATED', status: true };
      }

      throw new BadRequestException({
        message: 'NO BRANCH FOUND WITH PROVIDED ID',
        status: false,
      });
    } catch (e) {
      this.logger.error(
        `Error in update method: branchId = ${branchId}, payload = ${JSON.stringify(branch)}`,
        e.stack,
      );

      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(branchId: number): Promise<ResponseMessageInterface> {
    try {
      const deleteResult = await this.branchRepository.delete({ id: branchId });

      if (deleteResult.affected) {
        return { message: 'Deleted', status: true };
      }

      throw new BadRequestException({
        message: 'NO BRANCH FOUND WITH PROVIDED ID',
        status: false,
      });
    } catch (e) {
      this.logger.error(
        `Error in delete method: branchId = ${branchId}}`,
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
