import {HttpStatus} from "@nestjs/common";
import {CustomError} from "../../errors";

export class NoIdProvided extends CustomError {
    constructor() {
        super('No id was provided', HttpStatus.BAD_REQUEST);
    }
}
export class TemplateDoesNotExist extends CustomError {
    constructor() {
        super(`Template was not found`, HttpStatus.NOT_FOUND);
    }
}
