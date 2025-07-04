import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CommonService } from '../../common/classes/common-service.service';
import { Debt } from './debt.entity';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { DebtSearchParamsDto } from './dto/debt-search-params.dto';
import { isNumber } from '@nestjs/common/utils/shared.utils';


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

  async findByMemberId(memberId: number) {

    if (!memberId || !isNumber(memberId) || isNaN(memberId) || memberId === 0) throw new HttpException('SEARCH PARAMETERS ARE REQUIRED', HttpStatus.BAD_REQUEST);

    const query = this.repository.createQueryBuilder('debt')
      .leftJoinAndSelect('debt.member', 'member');


    if (memberId) {
      query.andWhere('member.id = :member_id', { member_id: memberId });
    }

    return await query.getOne();
  }


}
