import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { createProductDTO } from './dtos/create-product.dtos';
import { DeleteResult } from 'typeorm';
import { updateProductDto } from './dtos/update-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get()
    async findAll(): Promise<ReturnProduct[]> {
        return (await this.productService.findAll()).map(product => new ReturnProduct(product));
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: createProductDTO): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct);
    }

    @Roles(UserType.Admin)
    @Delete('/:productId')
    async deleteProduct(@Param('productId') productId: number): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId);
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put('/:productId')
    async updateProduct(@Body() updateProduct: updateProductDto, @Param('productId') productId: number): Promise<ProductEntity> {
        return this.productService.updateProduct(updateProduct, productId);
    }
}
