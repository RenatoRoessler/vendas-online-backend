import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { AddressEntity } from './entities/address.entity';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDto: CreateAddressDto, @UserId() userId: number) {
        return this.addressService.createAddress(createAddressDto, userId);
    }

    @Get()
    async findAddressesByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]> {
        return ((await this.addressService.findAddressesByUserId(userId)).map(address => new ReturnAddressDto(address)));

    }
}
