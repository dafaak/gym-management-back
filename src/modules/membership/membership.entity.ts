import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gym } from '../gym/gym.entity';
import { Branch } from '../branch/branch.entity';
import { MEMBERSHIP_STATUS } from '../../common/const/membership-status';

@Entity('membership')
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'double',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  duration: number;

  @Column({
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  details?: string;

  @Column({
    type: 'tinyint',
    nullable: false,
  })
  active: MEMBERSHIP_STATUS;

  @ManyToOne(() => Branch, (branch) => branch.memberships, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  branch: Branch | number;
}
