import { Test, TestingModule } from "@nestjs/testing";
import { UserEntityMock } from "../../user/__mocks__/user.mock";
import { UserService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { jwtMock } from "../__mocks__/jwt.mock";
import { loginUserMock } from "../__mocks__/login-user.mock";
import { ReturnUserDto } from "../../user/dtos/returnUser.dto";

describe('AuthService', () => {
    let service: AuthService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UserService,
                useValue: {
                    findUserByEmail: jest.fn().mockResolvedValue(UserEntityMock),
                }
            }, {
                    provide: JwtService,
                    useValue: {
                        sign: () => jwtMock,
                    }
                }],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });

    it('should return user if password and email valid', async () => {
        const user = await service.login(loginUserMock);
        expect(user).toEqual({
            accessToken: jwtMock,
            user: new ReturnUserDto(UserEntityMock),
        });
    });

    it('should return user if password invalid and email valid', async () => {
        expect(service.login({ ...loginUserMock, password: '123' })).rejects.toThrowError();
    });

    it('should return user if email no exist', async () => {
        jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(undefined);
        expect(service.login(loginUserMock)).rejects.toThrowError();
    });

    it('should return error in UserService', async () => {
        jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error())
        expect(service.login(loginUserMock)).rejects.toThrowError();
    });
});