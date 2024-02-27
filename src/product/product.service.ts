import { Injectable, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { createProductDTO } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { CountProduct } from './dtos/count-product.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,
    ) { }

    async findAll(productId?: number[], isFindRelations?: boolean): Promise<ProductEntity[]> {
        let findOptions = {};
        if (productId && productId.length > 0) {
            findOptions = {
                where: {
                    id: In(productId)
                }
            }
        }

        if (isFindRelations) {
            findOptions = {
                ...findOptions,
                relations: {
                    category: true
                }
            }
        }

        const products = await this.productRepository.find(findOptions);

        if (!products || products.length === 0) {
            throw new NotFoundException('Products not found');
        }

        return products;
    };

    async createProduct(createProduct: createProductDTO): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(createProduct.categoryId);
        return await this.productRepository.save(createProduct);
    }

    async findProductById(productId: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found`);
        }
        return product;
    }

    async deleteProduct(productId: number): Promise<DeleteResult> {
        await this.findProductById(productId)
        return this.productRepository.delete({ id: productId })
    }

    async updateProduct(updateProduct: createProductDTO, productId: number): Promise<ProductEntity> {
        const product = await this.findProductById(productId);
        return this.productRepository.save({ ...product, ...updateProduct });
    }

    async countProdutsByCategoryId(): Promise<CountProduct[]> {
        return this.productRepository.createQueryBuilder('product')
            .select('product.categoryId, COUNT(*) as total')
            .groupBy('product.categoryId')
            .getRawMany();
    }
}
