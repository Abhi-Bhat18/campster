import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './modules/seed/seed.module';
import { SeedService } from './modules/seed/seed.service';
import { DatabaseModule } from './modules/database/database.module';
import { DatabaseService } from './modules/database/database.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dbService = app.select(DatabaseModule).get(DatabaseService);
  const seedService = app.select(SeederModule).get(SeedService);

  await dbService.migrateToLatest();
  await seedService.seed();
  console.log('Seeding successful');
  app.close();
}
bootstrap();
