import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionalService } from './transactional.services';

import { Request } from 'express';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor(private transactionalService: TransactionalService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.headers['x-api-key'];

    if (typeof apiKey != 'string')
      throw new HttpException('Malformed API Key', HttpStatus.UNAUTHORIZED);

    if (!apiKey) throw new UnauthorizedException();

    const validated = await this.transactionalService.validateAPIKey(apiKey);
    if (!validated.isValid) {
      return false;
    }
    request.project_id = validated.project_id;
    return true;
  }
}
