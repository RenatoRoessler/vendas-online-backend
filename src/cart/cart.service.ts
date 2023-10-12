import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { ReturnCartDTO } from './dtos/return-cart.dto';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService
    ) { }

    async findCartByUserId(userId: number, isRelations?: boolean): Promise<CartEntity> {
        const relations = isRelations ? {
            cartProduct: {
                product: true
            }
        } : undefined
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            },
            relations
        });
        if (!cart) {
            throw new Error('No active cart found');
        }
        return cart;
    };

    async createCart(userId: number): Promise<CartEntity> {
        return await this.cartRepository.save({
            userId,
            active: true
        });
    }

    async insertProductInCart(insertCartDTO: InsertCartDTO, userId: number): Promise<ReturnCartDTO> {
        const cart = await this.findCartByUserId(userId).catch(async () => this.createCart(userId));
        await this.cartProductService.insertProductInCart(insertCartDTO, cart);
        return new ReturnCartDTO(await this.findCartByUserId(userId, true));
    }
}
