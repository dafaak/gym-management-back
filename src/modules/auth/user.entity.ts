import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gym } from '../gym/gym.entity';
import { Branch } from '../branch/branch.entity';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id: string;

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
    type: 'varchar',
    length: '100',
    nullable: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: '10',
    nullable: true,
  })
  phone?: string;

  @Column({
    type: 'varchar',
    length: '60',
    nullable: true,
  })
  password: string;

  @Column('simple-array')
  roles: string[];

  @ManyToOne(() => Gym, (gym) => gym.users,
    {
      onDelete: 'CASCADE',
      nullable: true,
      eager: true,
    })
  gym: number | Gym;

  @ManyToOne(() => Branch, (branch) => branch.users,
    {
      onDelete: 'CASCADE',
      nullable: true,
      eager: true,
    })
  branch: number | Branch;

}