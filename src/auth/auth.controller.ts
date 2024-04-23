import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  @UseGuards(AuthGuard())
  userCheck() {
    return { ok: true };
  }

  @Post('/signUp')
  signUp(@Body() createAuthDto: createAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signIn')
  signIn(@Body() createAuthDto: createAuthDto) {
    return this.authService.signIn(createAuthDto);
  }
}
