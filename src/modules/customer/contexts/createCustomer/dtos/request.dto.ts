import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateCustomerRequestDTO {
    @IsString()
    @MinLength(3)
    @ApiProperty({ example: 'Jhon Doe' })
    name: string;

    @IsEmail()
    @ApiProperty({ example: 'jhondoe@email.com' })
    email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'strongPassword123$' })
    password: string;

    @IsString()
    @Length(8, 15)
    @ApiProperty({ example: '00000000000' })
    phoneNumber: string;
}