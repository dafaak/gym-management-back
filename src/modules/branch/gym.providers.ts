import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { Branch } from './branch.entity';
import { DATASOURCES } from '../../config/database/const/datasources';

export const BRANCH_PROVIDERS = [
  {
    provide: REPOSITORIES.branch,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Branch),
    inject: [DATASOURCES.mySql],
  },
];
