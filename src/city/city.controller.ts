import { Controller, Get, Param } from '@nestjs/common';
import { cityEntity } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService) { }

    @Get('/:stateId')
    async getAllCitiesByStateId(@Param('stateId') stateId: number): Promise<cityEntity[]> {
        return this.cityService.getAllCitiesByStateId(stateId);
    }
}
