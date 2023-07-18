import { stateMock } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entities/city.entity";

export const cityMock: CityEntity = {
    createdAt: new Date(),
    id: 41233123,
    name: 'city name',
    stateId: stateMock.id,
    updatedAt: new Date(),
}