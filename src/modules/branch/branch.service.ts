import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { CommonService } from '../../common/classes/common-service.service';
import { Branch } from './branch.entity';

@Injectable()
export class BranchService extends CommonService<
  Branch,
  CreateBranchDto,
  UpdateBranchDto
> {
  constructor(
    @Inject(REPOSITORIES.branch)
    public readonly branchRepository: Repository<Branch>,
  ) {
    super(branchRepository);
  }

  async findById(id: number): Promise<Branch | null> {
    return await this.repository.findOne({ where: { id } });
  }

}
