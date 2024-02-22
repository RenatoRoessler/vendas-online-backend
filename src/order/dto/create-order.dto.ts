import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDTO {

    @IsOptional()
    @IsNumber()
    amountPayaments?: string;

    @IsOptional()
    @IsString()
    codePix: string;

    @IsOptional()
    @IsString()
    datePayaments: string;
}