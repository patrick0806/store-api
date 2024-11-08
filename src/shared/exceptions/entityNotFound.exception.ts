import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotFoundException extends HttpException {
    constructor(msg: string) {
        super(msg, HttpStatus.NOT_FOUND);

        this.name = 'EntityNotFoundException';
    }
}