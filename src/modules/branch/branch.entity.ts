import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gym } from '../gym/gym.entity';

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

  @ManyToOne(() => Gym, (gym) => gym.branches)
  gym: Gym;
}
