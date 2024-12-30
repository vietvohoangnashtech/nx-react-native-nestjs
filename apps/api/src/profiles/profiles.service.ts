import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private usersService: UsersService) {}

  async getProfile(userId: number) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    return {
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    };
  }

  async updateProfile(userId: number, profileDto: ProfileDto) {
    return this.usersService.updateUser(userId, profileDto);
  }
}
