import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';
import { cityEntity } from './entities/city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(cityEntity) 
        private readonly cityRepository: Repository<cityEntity>,
        private readonly cacheService: CacheService
    ) { }

    async getAllCitiesByStateId(stateId: number): Promise<cityEntity[]> {
        return this.cacheService.getCache<cityEntity[]>(`state_${stateId}`, () => this.cityRepository.find({ where: { stateId } }))

    }
}
