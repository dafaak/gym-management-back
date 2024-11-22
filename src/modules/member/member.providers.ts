import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { DATASOURCES } from '../../config/database/const/datasources';
import { Member } from './member.entity';

export const MEMBERS_PROVIDERS = [
  {
    provide: REPOSITORIES.member,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
    inject: [DATASOURCES.mySql],
  },
];
