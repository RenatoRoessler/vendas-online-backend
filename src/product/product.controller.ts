import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { createProductDto } from './dtos/create-product.dtos';

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
    async createProduct(@Body() createProduct: createProductDto): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct);
    }
}
