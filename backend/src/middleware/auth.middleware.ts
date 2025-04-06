import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SupabaseTokenMiddleware implements NestMiddleware {
  use(
    req: Request & { accessToken?: string },
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      req.accessToken = authHeader.slice(7);
    }
    next();
  }
}
