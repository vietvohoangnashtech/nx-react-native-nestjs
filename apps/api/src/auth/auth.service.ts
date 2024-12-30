import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { JwtPayload } from './dtos/jwtpayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.createUser({
      ...registerDto,
      password: hashPassword,
    });

    return this.login(user);
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password) {
      const comparePass = await bcrypt.compare(pass, user.password);
      if (comparePass) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { id: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(payload: JwtPayload) {
    return `Logout user ${payload.username}`;
  }
}
