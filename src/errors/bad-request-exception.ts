import { HttpException } from "./http-exception";

export class BadRequestException extends HttpException {
  constructor(message: string, details: Object) {
    super(400, message, details);
  }
}