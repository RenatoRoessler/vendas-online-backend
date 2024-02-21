import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityMock } from '../../user/__mocks__/user.mock';
import { addressMock } from '../__mocks_/address.mock';
import { createAddressMock } from '../__mocks_/create-address.mock';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';

describe('AddressController', () => {
    let controller: AddressController;
    let addressService: AddressService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: AddressService,
                    useValue: {
                        createAddress: jest.fn().mockResolvedValue(addressMock),
                        findAddressesByUserId: jest.fn().mockResolvedValue([addressMock]),
                    },
                },
            ],
            controllers: [AddressController],
        }).compile();

        controller = module.get<AddressController>(AddressController);
        addressService = module.get<AddressService>(AddressService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(addressService).toBeDefined();
    });

    it('should address Entity in createAddress', async () => {
        const address = await controller.createAddress(
            createAddressMock,
            UserEntityMock.id,
        );

        expect(address).toEqual(addressMock);
    });

    it('should address Entity in findAddressByUserId', async () => {
        const addresses = await controller.findAddressesByUserId(UserEntityMock.id);

        expect(addresses).toEqual([
            {
                complement: addressMock.complement,
                numberAddress: addressMock.numberAddress,
                cep: addressMock.cep,
            },
        ]);
    });
});