import { IsNumber, IsString } from "class-validator";

export class createProductDTO {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsNumber()
    categoryId: number;
}