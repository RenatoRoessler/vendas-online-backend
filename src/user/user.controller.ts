import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dtos';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return { ...createUser, password: undefined };
  }
}
