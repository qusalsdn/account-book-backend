import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { BreakdownService } from './breakdown.service';
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
  getAllBreakdown(@Req() req, @Query('date') date: string) {
    return this.bearkDownService.getAllBreakdown(req.user, date);
  }
}
