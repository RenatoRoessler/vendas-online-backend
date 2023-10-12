import { Controller, Post, Body, Get, Param, ValidationPipe, UsePipes, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dtos';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-passsword.dto';
import { UserId } from 'src/decorators/user-id.decorator';

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
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
  }

  @Patch('')
  @UsePipes(ValidationPipe)
  async updatePasswordUser(@UserId() userId: number, @Body() updatePasswordDTO: UpdatePasswordDTO): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
  }
}
