import { UserEntityMock } from "../../user/__mocks__/user.mock";
import { CartEntity } from "../entities/cart.entity";

export const CartMock: CartEntity = {
    active: true,
    id: 1,
    userId: UserEntityMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
}