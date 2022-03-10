import { MainError } from "./MainError";

export class NotFoundException extends MainError {
  constructor(message: any) {
    super(message);
    this.statusCode = 404;
  }

  toJSON() {
    return {
      name: this.name,
      code: this.statusCode,
      message: this.message
    }
  }
}