import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ) { }

    async createAddress(CreateAddressDto: CreateAddressDto, userId: number): Promise<AddressEntity> {
        await this.userService.findUserById(userId);
        await this.cityService.findCityById(CreateAddressDto.cityId);
        return this.addressRepository.save({ ...CreateAddressDto, userId });
    }

    async findAddressesByUserId(userId: number): Promise<AddressEntity[]> {
        const address = await this.addressRepository.find({ where: { userId }, relations: { city: { state: true, } } });
        if (!address || address.length === 0) {
            throw new NotFoundException(`Address not found for userId: ${userId}`);
        }
        return address;
    }
}
