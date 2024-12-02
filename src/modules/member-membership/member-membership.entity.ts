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
  startDate: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  endDate: string;

  @OneToOne(() => Member, (member) => member.memberMembership)
  member: Member | number;
}
