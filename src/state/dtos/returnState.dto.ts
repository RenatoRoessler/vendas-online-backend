import { stateEntity } from "../entities/state.entity";

export class ReturnStateDto {
    name: string;

    constructor(state: stateEntity) {
        this.name = state.name;
    }
}