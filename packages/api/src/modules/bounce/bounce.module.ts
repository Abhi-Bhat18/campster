import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BounceController } from './bounce.controller';
import { BounceService } from './bounce.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BounceController],
  providers: [BounceService],
})
export class BounceModule {}
