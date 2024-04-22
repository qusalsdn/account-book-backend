import { Auth } from 'src/auth/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Breakdown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  amount: string;

  @Column()
  date: string;

  @Column()
  memo: string;

  @ManyToOne(() => Auth, (auth) => auth.breakdown, { eager: false })
  auth: Auth;
}
