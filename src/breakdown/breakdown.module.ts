import { Module } from '@nestjs/common';
import { BreakdownController } from './breakdown.controller';
import { BreakdownService } from './breakdown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breakdown } from './breakdown.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breakdown])],
  controllers: [BreakdownController],
  providers: [BreakdownService],
})
export class BreakdownModule {}
