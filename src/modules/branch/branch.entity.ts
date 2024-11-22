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

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Member, (members) => members.branch)
  members: Member[];

  @ManyToOne(() => Gym, (gym) => gym.branches, {
    nullable: false,
  })
  gym: Gym | number;
}
