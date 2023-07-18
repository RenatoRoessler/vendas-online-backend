import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const UserEntityMock: UserEntity = {
    cpf: `12345678900`,
    email: 'renatonovo@email.com',
    createdAt: new Date(),
    id: 123123,
    name: 'mock',
    password: '$2b$10$sbOdID6ODN/TvI6treXEs.UJMR6p5gTR7C4qMDfxPc/IP8W/7yKrW',
    phone: '1232131231',
    typeUser: UserType.User,
    updatedAt: new Date(),
}