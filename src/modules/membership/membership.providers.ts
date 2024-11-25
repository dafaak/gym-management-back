import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { DATASOURCES } from '../../config/database/const/datasources';
import { Membership } from './membership.entity';

export const MEMBERSHIP_PROVIDERS = [
  {
    provide: REPOSITORIES.membership,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Membership),
    inject: [DATASOURCES.mySql],
  },
];
