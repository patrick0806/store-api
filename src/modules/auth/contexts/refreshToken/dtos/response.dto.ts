import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDTO {
    @ApiProperty()
    accessToken: string;
    @ApiProperty()
    refreshToken: string;
}