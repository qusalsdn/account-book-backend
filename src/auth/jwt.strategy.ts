import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth) private userRepository: Repository<Auth>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { username: string }): Promise<Auth> {
    const { username } = payload;
    const user: Auth = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException({ ok: false });
    }
    return user;
  }
}
