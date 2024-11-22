import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Branch } from '../branch/branch.entity';

@Entity('branch_hours')
export class BranchHours {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '100',
    comment: `'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'`,
    nullable: false,
  })
  dayOfTheWeek: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  timeRangeStart: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  timeRangeEnd?: string;

  @ManyToOne(() => Branch, (branch) => branch.branchHours, {
    nullable: false,
  })
  branch: Branch | number;
}
