import { Breakdown } from 'src/breakdown/breakdown.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Breakdown, (breakdown) => breakdown.auth, { eager: true })
  breakdown: Breakdown[];
}
