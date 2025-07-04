import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { MemberMembership } from '../member-membership/member-membership.entity';
import { Debt } from '../debt/debt.entity';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  ci: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  dateOfBirth: Date;

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
  email?: string;

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // faceVector?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => MemberMembership)
  @JoinColumn()
  memberMembership: MemberMembership | number;

  @OneToOne(() => Debt)
  @JoinColumn()
  memberDebt: Debt | number;

  @ManyToOne(() => Branch, (branch) => branch.members, {
    onDelete: 'CASCADE',
  })
  branch: Branch | number;
}
