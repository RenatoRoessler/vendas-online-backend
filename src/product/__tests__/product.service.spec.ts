import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: getRepositoryToken(ProductEntity),
        useValue: {
          find: jest.fn().mockResolvedValue([productMock]),
          findOne: jest.fn().mockResolvedValue(productMock),
          save: jest.fn().mockResolvedValue(productMock),
          delete: jest.fn().mockResolvedValue(returnDeleteMock),
        }
      }, {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          }
        }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
  });

  it('should return  error if products empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return  error in excpectio', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return product after insert in DB', async () => {
    const product = await service.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return product after insert in DB', async () => {
    jest.spyOn(categoryService, 'findCategoryById').mockRejectedValue(new Error());
    expect(service.createProduct(createProductMock)).rejects.toThrowError();
  });

  it('should return product in find by id', async () => {
    const product = await service.findProductById(productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should return errpor in product no found', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findProductById(productMock.id)).rejects.toThrowError();
  });

  it('should return deleted true in delete prod', async () => {
    const deleted = await service.deleteProduct(productMock.id);
    expect(deleted).toEqual(returnDeleteMock);
  });

  it('should return product after update', async () => {
    const product = await service.updateProduct(updateProductMock, productMock.id);
    expect(product).toEqual(productMock);
  });

  it('should error in update product', async () => {
    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error());
    expect(service.updateProduct(updateProductMock, productMock.id)).rejects.toThrowError();
  });
});
