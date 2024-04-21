import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { BreakdownService } from './breakdown.service';
import { Breakdown } from './breakdown.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('breakdown')
export class BreakdownController {
  constructor(private bearkDownService: BreakdownService) {}

  @Post('/create')
  @UseGuards(AuthGuard())
  create(@Body() createBearkdownDto: createBearkdownDto, @Req() req: any) {
    return this.bearkDownService.create(createBearkdownDto, req.user);
  }

  @Get('/')
  @UseGuards(AuthGuard())
  getAllBreakdown(@Req() req) {
    return this.bearkDownService.getAllBreakdown(req.user);
  }
}
