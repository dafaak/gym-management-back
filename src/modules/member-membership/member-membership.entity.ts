import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../member/member.entity';

@Entity('member_membership')
export class MemberMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  endDate: Date;
}
