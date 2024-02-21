import { UserEntityMock } from "../../user/__mocks__/user.mock";
import { LoginDto } from "../dtos/login.dto";

export const loginUserMock: LoginDto = {
    email: UserEntityMock.email,
    password: 'abc'
}