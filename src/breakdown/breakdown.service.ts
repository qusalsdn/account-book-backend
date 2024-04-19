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
      this.breakdownRepository.save(createBearkdownDto);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }
}
