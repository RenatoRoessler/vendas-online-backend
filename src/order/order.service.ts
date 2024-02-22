import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO, cartId: number) {
        return null;

    }
}
