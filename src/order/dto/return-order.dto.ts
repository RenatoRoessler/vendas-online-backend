import { ReturnAddressDto } from "../../address/dtos/returnAddress.dto";
import { ReturnUserDto } from "../../user/dtos/returnUser.dto";
import { OrderEntity } from "../entities/order.entity";
import { ReturnPaymentDTO } from "../../payment/dtos/return-payment.dto";
import { OrderProductEntity } from "../../order-product/entities/order-product.entity";
import { ReturnOrderProductDTO } from "../../order-product/dtos/return-order-product.dto";

export class ReturnOrderDTO {
    id: number;
    date: string;
    userId: number;
    addressId: number;
    paymentId: number;
    user?: ReturnUserDto;
    address?: ReturnAddressDto;
    payrment?: ReturnPaymentDTO;
    ordersProduct?: ReturnOrderProductDTO[];
    amountProducts?: number;

    constructor(order: OrderEntity) {
        this.id = order.id;
        this.date = order.date.toString();
        this.user = order.user ? new ReturnUserDto(order.user) : undefined;
        this.address = order.address ? new ReturnAddressDto(order.address) : undefined;
        this.payrment = order.payment ? new ReturnPaymentDTO(order.payment) : undefined;
        this.ordersProduct = order.ordersProduct ? order.ordersProduct.map((orderProduct: OrderProductEntity) => new ReturnOrderProductDTO(orderProduct)) : undefined;
        this.userId = order.userId;
        this.addressId = order.addressId;
        this.paymentId = order.paymentId;
        this.amountProducts = order.amountProducts;
    }
}