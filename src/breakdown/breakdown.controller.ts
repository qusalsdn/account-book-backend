import { Body, Controller, Post } from '@nestjs/common';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { BreakdownService } from './breakdown.service';

@Controller('breakdown')
export class BreakdownController {
  constructor(private bearkDownService: BreakdownService) {}

  @Post('/create')
  create(@Body() createBearkdownDto: createBearkdownDto) {
    return this.bearkDownService.create(createBearkdownDto);
  }
}
