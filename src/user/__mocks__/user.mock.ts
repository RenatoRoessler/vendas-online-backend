import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const UserEntityMock: UserEntity = {
    cpf: `12345678900`,
    email: 'mock@emil.com',
    createdAt: new Date(),
    id: 123123,
    name: 'mock',
    password: 'mock',
    phone: '1232131231',
    typeUser: UserType.User,
    updatedAt: new Date(),
}