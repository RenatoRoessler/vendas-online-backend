import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategory } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) { }

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();
        if (!categories || categories.length === 0) {
            throw new NotFoundException('Categories not found');
        }

        return categories;
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