import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breakdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  amount: number;

  @Column()
  date: string;

  @Column()
  memo: string;
}
