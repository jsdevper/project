import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //logger를 사용하면 간지나는 log를 찍을 수 있다
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `${req.ip}, ${req.method}, ${req.originalUrl}`,
        res.statusCode,
      );
    });
    next();
  }
}
