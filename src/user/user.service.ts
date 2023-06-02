import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dtos';
import { UserEntity } from './interface/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;

        const passwordHash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            type_user: 1,
            password: passwordHash,
        });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
