import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDTO } from "../dtos/create-product.dto";

export const createProductMock: CreateProductDTO = {
    name: 'Product 1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    categoryId: categoryMock.id,
}