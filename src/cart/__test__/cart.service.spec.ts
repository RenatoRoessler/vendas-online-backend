import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { CartMock } from '../__mocks__/cart.mock';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, {
        provide: CartProductService,
        useValue: {
          insertProductInCart: jest.fn().mockResolvedValue(undefined),
          deleteProductInCart: jest.fn().mockResolvedValue(returnDeleteMock),
          updateProductInCart: jest.fn().mockResolvedValue(undefined),
        }
      }, {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(CartMock),
            findOne: jest.fn().mockResolvedValue(CartMock),
          }
        }],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    cartRepository = module.get<Repository<CartEntity>>(getRepositoryToken(CartEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cartProductService).toBeDefined();
    expect(cartRepository).toBeDefined();
  });

  it('should return delete reulst if delte cart', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const resultDelete = await service.clearCart(CartMock.userId);
    expect(resultDelete).toEqual(returnDeleteMock);
    expect(spy.mock.calls[0][0]).toEqual({ ...CartMock, active: false });
  });
});
