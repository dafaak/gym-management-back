import { Test, TestingModule } from '@nestjs/testing';
import { BranchHoursService } from './branch-hours.service';

describe('BranchHoursService', () => {
  let service: BranchHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchHoursService],
    }).compile();

    service = module.get<BranchHoursService>(BranchHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
