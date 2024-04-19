import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { BreakdownService } from './breakdown.service';
import { Breakdown } from './breakdown.entity';

@Controller('breakdown')
export class BreakdownController {
  constructor(private bearkDownService: BreakdownService) {}

  @Post('/create')
  create(@Body() createBearkdownDto: createBearkdownDto) {
    return this.bearkDownService.create(createBearkdownDto);
  }

  @Get('/userId/:id')
  getAllBreakdown(@Param('id', ParseIntPipe) id: number): Promise<Breakdown[]> {
    return this.bearkDownService.getAllBreakdown(id);
  }
}
