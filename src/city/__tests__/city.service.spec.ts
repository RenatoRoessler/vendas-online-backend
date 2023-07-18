import { Repository } from "typeorm";
import { CityService } from "../city.service";
import { CityEntity } from "../entities/city.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CacheService } from "../../cache/cache.service";
import { cityMock } from "../__mocks__/city.mock";

describe('CityService', () => {
    let service: CityService;
    let cityRepository: Repository<CityEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CityService, {
                provide: CacheService,
                useValue: {
                    getCache: jest.fn().mockResolvedValue([cityMock]),
                }
            }, {
                    provide: getRepositoryToken(CityEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(cityMock),
                    }
                }]
        }).compile();

        service = module.get<CityService>(CityService);
        cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(cityRepository).toBeDefined();
    });

    it('should return findOne city', async() => {
        const cuty = await service.findCityById(cityMock.id);
        expect(cuty).toEqual(cityMock);
    });

    it('should return error findOnennot found', async() => {
        jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);
        expect(service.findCityById(cityMock.id)).rejects.toThrowError();
    });

    it('should return cities in getAllCitiesByStateId', async() => {
        const cuty = await service.getAllCitiesByStateId(cityMock.id);
        expect(cuty).toEqual([cityMock]);
    });


});