import { Test, TestingModule } from '@nestjs/testing';
import { BranchHoursController } from './branch-hours.controller';

describe('BranchHoursController', () => {
  let controller: BranchHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchHoursController],
    }).compile();

    controller = module.get<BranchHoursController>(BranchHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
