import { Injectable } from "@nestjs/common";
import ImageKit from "imagekit";

import env from "@config/env";
import { File } from "@nest-lab/fastify-multer";

import { ImageProvider } from "@shared/interfaces/imageProvider.interface";

@Injectable()

export class ImageKitProvider implements ImageProvider {
    private imageKit: ImageKit;
    constructor() {
        this.imageKit = new ImageKit({
            privateKey: env().imageKit.privateKey,
            publicKey: env().imageKit.publicKey,
            urlEndpoint: env().imageKit.url
        })
    }

    async uploadImage(image: File): Promise<string> {
        const uploadResult = await this.imageKit.upload({
            file: image.buffer,
            fileName: image.originalname,
        })

        return uploadResult.url;
    }
}