import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dtos';
import { UserEntity } from 'src/user/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly UserService: UserService) { }

    async login(loginDto: LoginDto): Promise<UserEntity> {
        const user: UserEntity | undefined = await this.UserService.findUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await compare(loginDto.password, user?.password ?? "");

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid');
        }

        return user;
    }
}
