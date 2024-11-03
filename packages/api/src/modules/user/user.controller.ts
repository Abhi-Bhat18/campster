import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Put()
  updateProfile(@Body() body: UpdateProfileDto, @Req() req: Request) {
    return this.userService.findByIdAndUpdate(req.user.id, body);
  }

  @Put('password')
  async updatePassword(@Body() body: UpdatePasswordDto, @Req() req: Request) {
    return await this.userService.updatePassword(body, req.user.id);
  }
}
