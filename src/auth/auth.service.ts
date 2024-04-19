import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import { createAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async signUp(createAuthDto: createAuthDto) {
    try {
      const { username, password } = createAuthDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.authRepository.create({
        username,
        password: hashedPassword,
      });
      await this.authRepository.save(user);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error };
    }
  }
}
