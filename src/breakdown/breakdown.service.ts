import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breakdown } from './breakdown.entity';
import { createBearkdownDto } from './dto/create-breakdown.dto';

@Injectable()
export class BreakdownService {
  constructor(
    @InjectRepository(Breakdown)
    private breakdownRepository: Repository<Breakdown>,
  ) {}

  async create(createBearkdownDto: createBearkdownDto) {
    try {
      await this.breakdownRepository.save(createBearkdownDto);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }

  async getAllBreakdown(id: number) {
    return await this.breakdownRepository.find({ where: { id } });
  }
}
