import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../../cart-product/cart-product.service';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { CartMock } from '../__mocks__/cart.mock';
import { NotFoundException } from '@nestjs/common';
import { UserEntityMock } from '../../user/__mocks__/user.mock';
import exp from 'constants';
import { insertCartMock } from '../__mocks__/insert-cart.mock';

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

  it('should return error in findOne undefined', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.clearCart(CartMock.userId)).rejects.toThrowError(NotFoundException);
  });

  it('should return card in success (not send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(CartMock.userId);
    expect(cart).toEqual(CartMock);
    expect(spy.mock.calls[0][0].relations).toEqual(undefined)
  });

  it('should return card in success (send relations)', async () => {
    const spy = jest.spyOn(cartRepository, 'findOne');
    const cart = await service.findCartByUserId(UserEntityMock.id, true);
    expect(cart).toEqual(CartMock);
    expect(spy.mock.calls[0][0].relations).toEqual({
      cartProduct: {
        product: true
      }
    })
  });

  it('should return NotFoundException in no found cart', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCartByUserId(UserEntityMock.id)).rejects.toThrowError(NotFoundException);
  });

  it('should return send info in save (createCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const cart = await service.createCart(UserEntityMock.id);
    expect(cart).toEqual(CartMock);
    expect(spy.mock.calls[0][0]).toEqual({
      userId: UserEntityMock.id,
      active: true
    });
  });

  it('should return cart in cart not found (insertProductInCart)', async () => {
    jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(cartProductService, 'insertProductInCart');

    const cart = await service.insertProductInCart(insertCartMock, UserEntityMock.id);

    expect(cart).toEqual(CartMock);
    expect(spy.mock.calls.length).toEqual(1);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });

  it('should return cart in cart found (insertProductInCart)', async () => {
    const spy = jest.spyOn(cartRepository, 'save');
    const spyCartProductService = jest.spyOn(cartProductService, 'insertProductInCart');

    const cart = await service.insertProductInCart(insertCartMock, UserEntityMock.id);

    expect(cart).toEqual(CartMock);
    expect(spy.mock.calls.length).toEqual(0);
    expect(spyCartProductService.mock.calls.length).toEqual(1);
  });


});
