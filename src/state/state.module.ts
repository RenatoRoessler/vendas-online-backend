import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { stateEntity } from './entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([stateEntity])],
  controllers: [StateController],
  providers: [StateService]
})
export class StateModule { }
