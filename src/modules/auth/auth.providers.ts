import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { DATASOURCES } from '../../config/database/const/datasources';
import { User } from './user.entity';

export const AUTH_PROVIDERS = [
  {
    provide: REPOSITORIES.user,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATASOURCES.mySql],
  },
];