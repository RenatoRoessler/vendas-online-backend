import { UpdatePasswordDTO } from "../dtos/update-passsword.dto";

export const updatePasswordMock: UpdatePasswordDTO = {
    lastPassword: 'abc',
    newPassword: '123',
}

export const updatePasswordInvalidMock: UpdatePasswordDTO = {
    lastPassword: 'gggg',
    newPassword: '123',

}