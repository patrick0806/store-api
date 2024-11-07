import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityInUseException extends HttpException {
    constructor(msg: string) {
        super(msg, HttpStatus.CONFLICT);

        this.name = 'EntityInUseException';
    }
}