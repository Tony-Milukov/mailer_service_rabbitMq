import {CustomError} from "../errors";
import {HttpStatus} from "@nestjs/common";

export class NoFilesProvided extends CustomError {
    constructor() {
        super('No files provided for upload', HttpStatus.BAD_REQUEST);
    }
}

export class FileUploadError extends CustomError {
    constructor() {
        super('File upload failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}