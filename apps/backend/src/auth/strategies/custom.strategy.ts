import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy, VerifiedCallback } from 'passport-custom';
import { Request } from 'express';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private readonly authService: AuthService) {
    super(async function (req: Request, callback: VerifiedCallback) {
      try {
        const user = await authService.validateUser(req);
        callback(null, user);
      } catch (err) {
        console.log('Error with auth strategy', err);
        callback(
          new UnauthorizedException(err?.message?.code || 'Unauthorized'),
          null,
        );
      }
    });
  }
}
