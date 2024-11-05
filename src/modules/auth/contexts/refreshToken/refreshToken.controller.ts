import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@shared/constants';
import { Public } from '@shared/decorators';

import { RefreshTokenRequestDTO } from './dtos/request.dto';
import { RefreshTokenResponseDTO } from './dtos/response.dto';
import { RefreshTokenService } from './refreshToken.service';

@Public()
@ApiTags(API_TAGS.AUTH)
@Controller({ version: '1', path: 'refresh-token' })
export class RefreshTokenController {
    constructor(private refreshTokenService: RefreshTokenService) { }

    @ApiOperation({ summary: 'Refresh token' })
    @ApiOkResponse({
        type: RefreshTokenResponseDTO,
        description: 'Refresh token with success',
    })
    @Post()
    @HttpCode(HttpStatus.OK)
    async handle(
        @Body() { refreshToken }: RefreshTokenRequestDTO,
    ): Promise<RefreshTokenResponseDTO> {
        return await this.refreshTokenService.execute(refreshToken);
    }
}