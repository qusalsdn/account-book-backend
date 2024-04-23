import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { createBearkdownDto } from './dto/create-breakdown.dto';
import { BreakdownService } from './breakdown.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('breakdown')
@UseGuards(AuthGuard())
export class BreakdownController {
  constructor(private bearkDownService: BreakdownService) {}

  @Post('/create')
  create(@Body() createBearkdownDto: createBearkdownDto, @Req() req: any) {
    return this.bearkDownService.create(createBearkdownDto, req.user);
  }

  @Get('/')
  getAllBreakdown(
    @Req() req: any,
    @Query('date') date: string,
    @Query('type') type: 'all' | 'income' | 'spending',
    @Query('search') search: string,
  ) {
    return this.bearkDownService.getAllBreakdown(req.user, date, type, search);
  }

  @Get('/update/:id')
  getBreakdownById(@Req() req: any, @Param('id') id: string) {
    return this.bearkDownService.getBreakdownById(req.user, id);
  }

  @Get('/analysis')
  analysis(
    @Req() req: any,
    @Query('date') date: string,
    @Query('type') type: string,
  ): any {
    return this.bearkDownService.analysis(req.user, date, type);
  }

  @Post('/update/:id')
  update(
    @Param('id') id: string,
    @Body() createBearkdownDto: createBearkdownDto,
  ) {
    return this.bearkDownService.update(id, createBearkdownDto);
  }
}
