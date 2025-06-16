import {CustomError} from "../errors";

export class TemplateDoesNotExist extends CustomError {
  constructor(message = "Provided template does not exist") {
    super(message, 404);
  }
}



