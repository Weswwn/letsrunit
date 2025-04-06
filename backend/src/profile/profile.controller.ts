import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:id')
  async getProfile(@Param('id') id: string, @Req() request: Request) {
    console.log('id:', id);
    return await this.profileService.getProfile(id);
  }
}
