import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe, Param, Patch } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { ReturnCartDTO } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCartDTO } from './dtos/update-cart.dto';

@Roles(UserType.User, UserType.Admin, UserType.Root)
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

    @Delete('product/:productId')
    async deleteProductInCart(@Param('productId') productId: number, @UserId() userId: number): Promise<DeleteResult> {
        return this.cartService.deleteProductInCart(productId, userId);
    }

    @UsePipes(ValidationPipe)
    @Patch()
    async updateProductInCart(@Body() updateCartDTO: UpdateCartDTO, @UserId() userId: number): Promise<ReturnCartDTO> {
        return new ReturnCartDTO(await this.cartService.updateProductInCart(updateCartDTO, userId));
    }

}
