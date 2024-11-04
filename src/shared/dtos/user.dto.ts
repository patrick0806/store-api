import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UserDTO {
    @ApiProperty({
        description: 'User id',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe'
    })
    name: string;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com'
    })
    email: string;

    @Exclude()
    password: string;

    @ApiProperty({
        description: 'User activation status',
        example: true,
    })
    isActive: boolean;

    @ApiProperty({
        description: 'Creation Date',
        example: new Date()
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Updated Date',
        example: new Date()
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'Object version',
        example: 1
    })
    version: number;
}