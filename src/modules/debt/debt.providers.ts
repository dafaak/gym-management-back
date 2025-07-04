import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { DATASOURCES } from '../../config/database/const/datasources';
import { Debt } from './debt.entity';

export const DEBT_PROVIDERS = [
  {
    provide: REPOSITORIES.debt,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Debt),
    inject: [DATASOURCES.mySql],
  },
];
