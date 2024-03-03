import { Controller, Post, Body, Get, Param, ValidationPipe, UsePipes, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-passsword.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Roles(UserType.Root)
  @Post('/admin')
  async createAdmin(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser, UserType.Admin);
  }


  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/all')
  async getAllUser(): Promise<ReturnUserDto[]> {
    return ((await this.userService.getAllUser()).map(user => new ReturnUserDto(user)));
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch('')
  @UsePipes(ValidationPipe)
  async updatePasswordUser(@UserId() userId: number, @Body() updatePasswordDTO: UpdatePasswordDTO): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserByIdUsingRelations(userId));
  }
}
