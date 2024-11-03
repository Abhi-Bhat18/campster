import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BounceGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const apiKey = this.configService.get('BOUNCE_API_KEY');
      if (apiKey === request.headers['x-api-key']) {
        return true;
      }
      return false;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
