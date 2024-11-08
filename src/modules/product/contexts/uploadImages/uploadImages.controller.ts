import { Controller, HttpCode, HttpStatus, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { API_TAGS } from "@shared/constants";
import { Roles } from "@shared/decorators";
import { ApplicationRoles } from "@shared/enums";
import { File, FilesInterceptor } from '@nest-lab/fastify-multer';
import { UploadImagesService } from "./uploadImages.service";

@Roles(ApplicationRoles.ADMIN)
@ApiTags(API_TAGS.PRODUCT)
@Controller()
export class UploadImagesController {
    constructor(private uploadImages: UploadImagesService) { }

    @Post('/:productId/images')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload productImages' })
    @ApiConsumes("multipart/form-data")
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Images uploaded with success' })
    @UseInterceptors(FilesInterceptor("files", 10))
    @ApiBody({
        required: true,
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary"
                    }
                }
            }
        }
    })
    async handler(
        @Param('productId') productId: number,
        @UploadedFiles() files: File[]
    ) {
        return this.uploadImages.execute(productId, files);
    }
}