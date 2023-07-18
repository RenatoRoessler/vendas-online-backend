import { cityMock } from "../../city/__mocks__/city.mock";
import { UserEntityMock } from "../../user/__mocks__/user.mock";
import { AddressEntity } from "../entities/address.entity";

export const addressMock: AddressEntity = {
    id: 123312,
    userId: UserEntityMock.id,
    complement: 'complement',
    numberAddress: 123,
    cep: '123123',
    cityId: cityMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
}