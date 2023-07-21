import { categoryMock } from "../../category/__mocks__/category.mock";
import { createProductDto } from "../dtos/create-product.dtos";

export const createProductMock: createProductDto  = {
    name: 'Product 1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    categoryId: categoryMock.id,
}