import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Breakdown } from './breakdown.entity';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { Auth } from 'src/auth/auth.entity';

@Injectable()
export class BreakdownService {
  constructor(
    @InjectRepository(Breakdown)
    private breakdownRepository: Repository<Breakdown>,
  ) {}

  async create(createBearkdownDto: createBearkdownDto, auth: Auth) {
    try {
      const { amount, type, category, date, memo } = createBearkdownDto;
      const user = this.breakdownRepository.create({
        amount,
        type,
        category,
        date,
        memo,
        auth,
      });
      await this.breakdownRepository.save(user);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  async getAllBreakdown(auth: Auth, date: string) {
    const breakdown = await this.breakdownRepository.find({
      where: { auth, date: Like(`%${date}%`) },
    });
    const [{ 'sum(amount)': income }] = await this.breakdownRepository.query(
      `select sum(amount) from breakdown where authId=${auth.id} and type='income' and date like '%${date}%'`,
    );
    const [{ 'sum(amount)': spending }] = await this.breakdownRepository.query(
      `select sum(amount) from breakdown where authId=${auth.id} and type='spending' and date like '%${date}%'`,
    );
    return {
      ok: true,
      breakdown,
      income: Number(income),
      spending: Number(spending),
    };
  }
}
