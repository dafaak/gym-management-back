import { REPOSITORIES } from '../const/repositories';
import { DataSource } from 'typeorm';
import { DATASOURCES } from '../../config/database/const/datasources';
import { MemberMembership } from './member-membership.entity';

export const MEMBER_MEMBERSHIP_PROVIDERS = [
  {
    provide: REPOSITORIES.memberMembership,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MemberMembership),
    inject: [DATASOURCES.mySql],
  },
];
