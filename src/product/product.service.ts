import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { createProductDto } from './dtos/create-product.dtos';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService,
    ) { }

    async findAll(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();

        if (!products || products.length === 0) {
            throw new NotFoundException('Products not found');
        }

        return products;
    };

    async createProduct(createProduct: createProductDto) : Promise<ProductEntity> {
        await this.categoryService.findCategoryById(createProduct.categoryId);
        return await this.productRepository.save(createProduct);
    }
}
