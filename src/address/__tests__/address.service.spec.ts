import { Repository } from "typeorm";
import { AddressService } from "../address.service";
import { AddressEntity } from "../entities/address.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { addressMock } from "../__mocks_/address.mock";
import { UserService } from "../../user/user.service";
import { UserEntityMock } from "../../user/__mocks__/user.mock";
import { CityService } from "../../city/city.service";
import { cityMock } from "../../city/__mocks__/city.mock";
import { createAddressMock } from "../__mocks_/create-address.mock";

describe('addressService', () => {
    let service: AddressService;
    let addressRepository: Repository<AddressEntity>;
    let userService: UserService;
    let cityService: CityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AddressService, {
                provide: UserService,
                useValue: {
                    findUserById: jest.fn().mockResolvedValue(UserEntityMock),
                }
            }, {
                    provide: CityService,
                    useValue: {
                        findCityById: jest.fn().mockResolvedValue(cityMock),
                    }
                }, {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(addressMock),
                        find: jest.fn().mockResolvedValue([addressMock]),
                    },
                }],
        }).compile();

        service = module.get<AddressService>(AddressService);
        addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
        userService = module.get<UserService>(UserService);
        cityService = module.get<CityService>(CityService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(addressRepository).toBeDefined();
        expect(userService).toBeDefined();
        expect(cityService).toBeDefined();
    });

    it('should return address after save', async () => {
        const address = await service.createAddress(createAddressMock, UserEntityMock.id);
        expect(address).toEqual(addressMock);
    });

    it('should return error if exception in UserService address after save', async () => {
        jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());
        expect(service.createAddress(createAddressMock, UserEntityMock.id)).rejects.toThrowError();
    });

    it('should return error if exception in CityService address after save', async () => {
        jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
        expect(service.createAddress(createAddressMock, UserEntityMock.id)).rejects.toThrowError();
    });

    it('should return all addresses to user', async () => {
        const addresses = await service.findAddressesByUserId(UserEntityMock.id);
        expect(addresses).toEqual([addressMock]);
    })

    it('should return not fould if not address registred', async () => {
        jest.spyOn(addressRepository, 'find').mockResolvedValueOnce(undefined);
        expect(service.findAddressesByUserId(UserEntityMock.id)).rejects.toThrowError();
    })
});