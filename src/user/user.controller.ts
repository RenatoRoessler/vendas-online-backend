import { Controller, Post, Body, Get, Param, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dtos';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return ((await this.userService.getAllUsers()).map(user => new ReturnUserDto(user)));
  }

  @Get('/:userId')
  async getUserById(@Param('userID') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
  }
}
