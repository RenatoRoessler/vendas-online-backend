import { categoryMock } from "../../category/__mocks__/category.mock";
import { updateProductDto } from "../dtos/update-product.dto";

export const updateProductMock: updateProductDto  = {
    name: 'Product 1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    categoryId: categoryMock.id,
}