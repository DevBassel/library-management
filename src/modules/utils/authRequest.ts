import { Request } from 'express';
import { JwtPayload } from '../auth/dto/jwt-payload';

export interface AuthRequest extends Request {
  user: JwtPayload;
}
