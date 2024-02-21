import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-passsword.dto';
import { createPasswordHashed, validatePassword } from '../utils/password';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) { }



    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email).catch(() => undefined);
        if (user) {
            throw new BadRequestException('emial registered in system');
        }

        const passwordHash = await createPasswordHashed(createUserDto.password);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: UserType.User,
            password: passwordHash,
        });
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    }
                }
            }
        });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        })

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    async updatePasswordUser(updatePasswordUser: UpdatePasswordDTO, userId: number): Promise<UserEntity> {
        const user = await this.findUserById(userId);
        const passwordHash = await createPasswordHashed(updatePasswordUser.newPassword);

        const isMatch = await validatePassword(updatePasswordUser.lastPassword, user.password || '');

        if (!isMatch) {
            throw new BadRequestException('Last password invalid');
        }
        return this.userRepository.save({ ...user, password: passwordHash })
    }
}
