import { Module } from '@nestjs/common';
import { BreakdownModule } from './breakdown/breakdown.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BreakdownModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}
