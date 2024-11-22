import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { DATASOURCES } from '../../config/database/const/datasources';
import { BranchHours } from './branch-hours.entity';

export const BRANCH_HOURS_PROVIDERS = [
  {
    provide: REPOSITORIES.branch_hours,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BranchHours),
    inject: [DATASOURCES.mySql],
  },
];
