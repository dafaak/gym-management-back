import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gym } from '../gym/gym.entity';
import { BranchHours } from '../branch-hours/branch-hours.entity';
import { Member } from '../member/member.entity';
import { Membership } from '../membership/membership.entity';

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  alias: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: true,
  })
  lat?: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: true,
  })
  long?: string;

  @OneToMany(() => BranchHours, (branchHours) => branchHours.branch, {
    onDelete: 'CASCADE',
  })
  branchHours: BranchHours[];

  @OneToMany(() => Membership, (membership) => membership.branch, {
    onDelete: 'CASCADE',
  })
  memberships: Membership[];

  @OneToMany(() => Member, (members) => members.branch, {
    onDelete: 'CASCADE',
  })
  members: Member[];

  @ManyToOne(() => Gym, (gym) => gym.branches, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  gym: Gym | number;
}
