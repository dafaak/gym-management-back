import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../../common/classes/common-service.service';
import { BranchHours } from './branch-hours.entity';
import { REPOSITORIES } from '../const/repositories';
import { Repository } from 'typeorm';
import { CreateBranchHoursDto } from './dto/create-branch-hours.dto';
import { UpdateBranchHoursDto } from './dto/update-branch-hours.dto';

@Injectable()
export class BranchHoursService extends CommonService<
  BranchHours,
  CreateBranchHoursDto,
  UpdateBranchHoursDto
> {
  constructor(
    @Inject(REPOSITORIES.branch_hours)
    private branchHoursRepository: Repository<BranchHours>,
  ) {
    super(branchHoursRepository);
  }
}
