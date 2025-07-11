import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gym')
export class GymEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '15',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: true,
  })
  email: string;
}
