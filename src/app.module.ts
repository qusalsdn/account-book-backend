import { Module } from '@nestjs/common';
import { BreakdownModule } from './breakdown/breakdown.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [BreakdownModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
