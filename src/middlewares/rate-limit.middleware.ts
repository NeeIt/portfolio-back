import { Injectable } from '@nestjs/common';
import { NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      handler: (req, res) => {
        res.status(429).json({
          message: 'Too many requests, please try again later.',
        });
      },
    })(req, res, next);
  }
}