import { FastifyReply, FastifyRequest } from "fastify";
import { HttpException } from "../../errors/http-exception";
import { ZodError, ZodIssue } from "zod";

export class CustomErrorHandler {
  public getBindedHandle() {
    return this.handle.bind(this);
  }

  public handle(error: any, _: FastifyRequest, reply: FastifyReply) {
    if(error instanceof HttpException) return reply.status(error.getStatus()).send(error.getHttpResponse());
    if(error instanceof ZodError) return reply.status(400).send(this.formatZodValidationResponse(error));

    reply.status(500).send({ error: true, message: error.name, details: error.message })
  }

  private formatZodValidationResponse(error: ZodError)  {
    return {
      error: true,
      message: 'Validation Error',
      details: this.formattingZodIssues(error.issues)
    }
  }

  private formattingZodIssues(issues: ZodIssue[]) {
    return issues.map((issue) => {
      return {
        path: issue.path,
        message: issue.message,
      };
    });
  }
}