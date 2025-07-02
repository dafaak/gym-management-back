import { DeepPartial, Repository } from 'typeorm';
import {
  Logger,
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export abstract class CommonService<
  TEntity,
  TCreateDto extends DeepPartial<TEntity>,
  TUpdateDto extends Partial<TEntity>,
> {
  protected readonly logger = new Logger();

  constructor(protected readonly repository: Repository<TEntity>) {
  }


  async findAll(): Promise<TEntity[]> {
    return this.repository.find();
  }

  async create(
    data: TCreateDto,
  ): Promise<{ message: string; status: boolean }> {
    console.log('service:', data);
    try {
      await this.repository.save(data);
      return { message: 'CREATED', status: true };
    } catch (e) {
      this.logger.error(
        `Error in create method: payload = ${JSON.stringify(data)}`,
        e.stack,
      );
      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    data: TUpdateDto,
  ): Promise<{ message: string; status: boolean }> {
    try {
      const updateRes = await this.repository.update(id, data as any);

      if (updateRes.affected) {
        return { message: 'UPDATED', status: true };
      }

      throw new BadRequestException({
        message: 'NO ENTITY FOUND WITH PROVIDED ID',
        status: false,
      });
    } catch (e) {
      this.logger.error(
        `Error in update method: id = ${id}, payload = ${JSON.stringify(data)}`,
        e.stack,
      );
      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ message: string; status: boolean }> {
    try {
      const deleteResult = await this.repository.delete(id);

      if (deleteResult.affected) {
        return { message: 'DELETED', status: true };
      }

      throw new BadRequestException({
        message: 'NO ENTITY FOUND WITH PROVIDED ID',
        status: false,
      });
    } catch (e) {
      this.logger.error(`Error in delete method: id = ${id}`, e.stack);

      if (e instanceof BadRequestException) throw e;

      throw new HttpException(
        { message: e.message || 'INTERNAL SERVER ERROR', status: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
