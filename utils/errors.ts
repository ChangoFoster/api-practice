import { Request, Response, NextFunction } from "express";

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  name?: string;
  httpCode: HttpCode;
  description: string;
}

class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;

  constructor(args: AppErrorArgs) {
    super(args.description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    Error.captureStackTrace(this);
  }
}

const errorHandler = (
  error: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "ValidationError") {
    return res.status(HttpCode.BAD_REQUEST).json({ error: error.message });
  }

  next(error);
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(HttpCode.NOT_FOUND).send({ error: "unknown endpoint" });
};

export { AppError, errorHandler, unknownEndpoint };
