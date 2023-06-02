import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { cityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(cityEntity) private readonly cityRepository: Repository<cityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getAllCitiesByStateId(stateId: number): Promise<cityEntity[]> {
        const citiesCache: cityEntity[] = await this.cacheManager.get(`state_${stateId}}`);
        if (citiesCache) {
            return citiesCache;
        }
        const cities = await this.cityRepository.find({ where: { stateId } });
        await this.cacheManager.set(`state_${stateId}`, cities);
        return cities
    }
}
