import { Test, TestingModule } from '@nestjs/testing';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { UserEntityMock } from '../../user/__mocks__/user.mock';
import { CartMock } from '../__mocks__/cart.mock';
import { insertCartMock } from '../__mocks__/insert-cart.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';

describe('CartController', () => {
    let controller: CartController;
    let cartService: CartService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CartService,
                    useValue: {
                        insertProductInCart: jest.fn().mockResolvedValue(CartMock),
                        findCartByUserId: jest.fn().mockResolvedValue(CartMock),
                        clearCart: jest.fn().mockResolvedValue(returnDeleteMock),
                        updateProductInCart: jest.fn().mockResolvedValue(CartMock),
                    },
                },
            ],
            controllers: [CartController],
        }).compile();

        controller = module.get<CartController>(CartController);
        cartService = module.get<CartService>(CartService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(cartService).toBeDefined();
    });

    it('should cart Entity in insertProductInCart', async () => {
        const cart = await controller.createCart(insertCartMock, UserEntityMock.id);

        expect(cart.id).toEqual(CartMock.id);
    });

    it('should cart Entity in insertProductInCart', async () => {
        const cart = await controller.findCartByUserId(UserEntityMock.id);

        expect(cart.id).toEqual(CartMock.id);
    });

    it('should return DeleteResult in clearCart', async () => {
        const cart = await controller.clearCart(UserEntityMock.id);

        expect(cart).toEqual(returnDeleteMock);
    });

    it('should cart Entity in updateProductInCart', async () => {
        const cart = await controller.updateProductInCart(
            updateCartMock,
            UserEntityMock.id,
        );

        expect(cart).toEqual({
            id: CartMock.id,
        });
    });
});