import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './dtos/profile.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { JwtPayload } from '../auth/dtos/jwtpayload.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req) {
    const user = req.user as JwtPayload;
    return this.profilesService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateProfile(@Req() req, @Body() profileDto: ProfileDto) {
    const user = req.user as JwtPayload;
    return this.profilesService.updateProfile(user.id, profileDto);
  }
}
