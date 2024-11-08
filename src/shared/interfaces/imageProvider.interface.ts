import { File } from "@nest-lab/fastify-multer";

export interface ImageProvider {
    uploadImage: (image: File) => Promise<string>;
}