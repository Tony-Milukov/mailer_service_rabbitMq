import {CustomError} from "../errors";

export class FileDoesNotExist extends CustomError {
  constructor(message = "Provided file does not exist") {
    super(message, 404);
  }
}

