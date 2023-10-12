import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertCartDTO } from './dtos/insert-cart.dto';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>
    ) { }

    async verifyActiveCart(userId: number): Promise<CartEntity> {
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            }
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

    async insertProductInCart(insertCart: InsertCartDTO, userId: number): Promise<CartEntity> {
        const cart = await this.verifyActiveCart(userId).catch(async () => this.createCart(userId));
        return cart;
        // return await this.cartRepository.save({
        //     ...cart,
        //     cartProduct: [
        //         {
        //             productId: insertCart.productId,
        //             amount: insertCart.amount
        //         }
        //     ]
        // });

    }
}
