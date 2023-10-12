import { ReturnProduct } from "src/product/dtos/return-product.dto";
import { CartProductEntity } from "../entities/cart-product.entity";
import { ReturnCartDTO } from "src/cart/dtos/return-cart.dto";

export class ReturnCartProductDTO {
    id: number;
    cartId: number;
    productId: number;
    amount: number;
    product?: ReturnProduct;
    cart?: ReturnCartDTO;
    constructor(cartProduct: CartProductEntity) {
        this.id = cartProduct.id;
        this.amount = cartProduct.amount;
        this.productId = cartProduct.productId;
        this.cartId = cartProduct.cartId;
        this.product = cartProduct.product && new ReturnProduct(cartProduct.product);
        this.cart = cartProduct.cart && new ReturnCartDTO(cartProduct.cart);
    }
}