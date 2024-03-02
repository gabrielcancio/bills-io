import { HttpException } from "./http-exception";

export class NotFoundException extends HttpException {
  constructor(message: string, details: Object) {
    super(404, message, details);
  }
}