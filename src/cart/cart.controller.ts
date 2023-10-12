import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { ReturnCartDTO } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @UsePipes(ValidationPipe)
    @Post()
    async createCart(@Body() insertCart: InsertCartDTO, @UserId() UserId: number): Promise<ReturnCartDTO> {
        return this.cartService.insertProductInCart(insertCart, UserId);
    }

    @Get()
    async findCartByUserId(@UserId() UserId: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.findCartByUserId(UserId, true));
    }

    @Delete()
    async clearCart(@UserId() userId: number): Promise<DeleteResult> {
        return this.cartService.clearCart(userId);
    }
}
