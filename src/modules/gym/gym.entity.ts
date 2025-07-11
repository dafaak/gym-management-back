import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Branch } from '../branch/branch.entity';
import { User } from '../auth/user.entity';

@Entity('gym')
export class Gym {
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

  @OneToMany(() => Branch, (branch) => branch.gym, {
    onDelete: 'CASCADE',
  })
  branches: Branch[];

  @OneToMany(() => User, (user) => user.gym, {
    onDelete: 'CASCADE',
  })
  users: User[];


}
