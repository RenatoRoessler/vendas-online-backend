import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateCategory } from './dtos/create-category.dto';
import { ReturnCategory } from './dtos/return-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CountProduct } from 'src/product/dtos/count-product.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        private readonly productService: ProductService,
    ) { }

    findAmountCategoryINProducts = (category: CategoryEntity, countList: CountProduct[]): number => {
        const count = countList.find((count: any) => count.category_id === category.id);
        return count ? count.total : 0;
    }

    async findAllCategories(): Promise<ReturnCategory[]> {
        const categories = await this.categoryRepository.find();
        if (!categories || categories.length === 0) {
            throw new NotFoundException('Categories not found');
        }

        const count = await this.productService.countProductsByCategoryId();

        return categories.map(category => new ReturnCategory(category, this.findAmountCategoryINProducts(category, count)));
    }

    async findCategoryById(categoryId: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId,
            }
        });
        if (!category) {
            throw new NotFoundException(`Category with id ${categoryId} not found`);
        }
        return category;
    }

    async createCategory(createCategory: CreateCategory): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(createCategory.name).catch(() => undefined);
        if (category) {
            throw new NotFoundException(`Category with name ${createCategory.name} already exists`);
        }
        return await this.categoryRepository.save(createCategory);
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        });
        if (!category) {
            throw new NotFoundException(`Category with name ${name} not found`);
        }
        return category;
    }
}
