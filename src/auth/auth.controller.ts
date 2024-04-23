import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() createAuthDto: createAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signIn')
  signIn(@Body() createAuthDto: createAuthDto) {
    return this.authService.signIn(createAuthDto);
  }
}
