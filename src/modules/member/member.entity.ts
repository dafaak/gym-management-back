import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from '../branch/branch.entity';

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
  dateOfBirth: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  membershipStatus: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: true,
  })
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Branch, (branch) => branch.members, {
    onDelete: 'CASCADE',
  })
  branch: Branch | number;
}
