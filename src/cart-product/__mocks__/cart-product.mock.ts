import { productMock } from "../../product/__mocks__/product.mock";
import { CartMock } from "../../cart/__mocks__/cart.mock";
import { CartProductEntity } from "../entities/cart-product.entity";

export const cartProductMock: CartProductEntity = {
    id: 1,
    cartId: CartMock.id,
    productId: productMock.id,
    amount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
}