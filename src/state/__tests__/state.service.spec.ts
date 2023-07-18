import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { stateEntity } from "../entities/state.entity";
import { StateService } from "../state.service";
import { stateMock } from "../__mocks__/state.mock";

describe('StateService', () => {
    let service: StateService;
    let stateRepository: Repository<stateEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StateService, {
                provide: getRepositoryToken(stateEntity),
                useValue: {
                    find: jest.fn().mockResolvedValue([stateMock]),
                },
            }],
        }).compile();

        service = module.get<StateService>(StateService);
        stateRepository = module.get<Repository<stateEntity>>(getRepositoryToken(stateEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(stateRepository).toBeDefined();
    });

    it('should return list of states', async() => {
        const state = await service.getAllStates();
        expect(state).toEqual([stateMock]);
    });

    it('should return error in excpetion', async() => {
        jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
        expect(service.getAllStates()).rejects.toThrowError()
    });
    
});