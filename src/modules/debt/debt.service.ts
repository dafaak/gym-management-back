import { Inject, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CommonService } from '../../common/classes/common-service.service';
import { Debt } from './debt.entity';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';


@Injectable()
export class DebtService extends CommonService<Debt, CreateDebtDto, UpdateDebtDto> {

  constructor(
    @Inject(REPOSITORIES.debt)
    private debtRepository: Repository<Debt>,
  ) {
    super(debtRepository);
  }

  async findById(id: number): Promise<Debt | null> {
    if (!id) {
      return null;
    }
    return await this.repository.findOne({ where: { id } });
  }
}
