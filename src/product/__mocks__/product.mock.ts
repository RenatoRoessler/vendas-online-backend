import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    id: 1,
    name: 'Product 1',
    price: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'https://via.placeholder.com/150',
    categoryId: categoryMock.id,
}
