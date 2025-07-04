import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Member } from '../member/member.entity';

@Entity('debt')
export class Debt {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    nullable: false,
    scale: 2,
    precision: 10,
  })
  total_debt: number;

  @UpdateDateColumn({})
  last_updated: Date;

  @OneToOne(() => Member, (member) => member.debt, { nullable: false })
  @JoinColumn()
  member: Member | number;

}
