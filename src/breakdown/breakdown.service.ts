import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getAllBreakdown(auth: Auth) {
    const breakdown = await this.breakdownRepository.find({ where: { auth } });
    return { ok: true, breakdown };
  }
}
