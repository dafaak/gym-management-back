import { DataSource } from 'typeorm';
import { GymEntity } from './gym.entity';

export const GYM_PROVIDERS = [
  {
    provide: 'GYM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(GymEntity),
    inject: ['DATA_SOURCE'],
  },
];
