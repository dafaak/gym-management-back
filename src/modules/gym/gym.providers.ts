import { DataSource } from 'typeorm';
import { Gym } from './gym.entity';
import { REPOSITORIES } from '../const/repositories';
import { DATASOURCES } from '../../config/database/const/datasources';

export const GYM_PROVIDERS = [
  {
    provide: REPOSITORIES.gym,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Gym),
    inject: [DATASOURCES.mySql],
  },
];
