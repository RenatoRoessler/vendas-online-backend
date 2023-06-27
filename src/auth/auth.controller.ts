import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/ReturnLogin.dto';
import { LoginDto } from './dtos/login.dtos';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
        return await this.authService.login(loginDto);
    }
}
