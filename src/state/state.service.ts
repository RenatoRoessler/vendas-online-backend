import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
    
    constructor(
        @InjectRepository(stateEntity)
        private readonly stateRepository: Repository<stateEntity>,
    ) {}

    async getAllStates(): Promise<stateEntity[]> {
        return await this.stateRepository.find();
    }
}
