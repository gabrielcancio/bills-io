export abstract class HttpException {
  constructor(private statusCode: number, private message: string, private details: Object) {
  }

  public getStatus() {
    return this.statusCode;
  }

  public getHttpResponse() {
    return {
      error: true,
      message: this.message,
      details: this.details
    }
  }
}