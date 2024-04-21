import { Module } from '@nestjs/common';
import { BreakdownController } from './breakdown.controller';
import { BreakdownService } from './breakdown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breakdown } from './breakdown.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Breakdown]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BreakdownController],
  providers: [BreakdownService],
})
export class BreakdownModule {}
