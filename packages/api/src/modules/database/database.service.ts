// src/database/database.service.ts
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database.types'; // Your database types
import { ConfigService } from '@nestjs/config';
import { Migrator, FileMigrationProvider } from 'kysely';
import * as path from 'path';
import { promises as fs } from 'fs';
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private db: Kysely<Database>;
  private readonly logger = new Logger(DatabaseService.name);
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    const pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
    });

    this.db = new Kysely<Database>({
      dialect: new PostgresDialect({ pool }),
    });
  }

  async onModuleDestroy() {
    if (this.db) {
      await this.db.destroy();
    }
  }

  getDb(): Kysely<Database> {
    return this.db;
  }

  async migrateToLatest() {
    const migrator = new Migrator({
      db: this.db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, '../../migrations'),
      }),
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === 'Success') {
        this.logger.log(
          `migration "${it.migrationName}" was executed successfully`,
        );
      } else if (it.status === 'Error') {
        this.logger.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      this.logger.error('failed to migrate');
      this.logger.error(error);
      process.exit(1);
    }
  }

  async migrateDown() {
    const migrator = new Migrator({
      db: this.db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, '../../migrations'),
      }),
    });

    const { error, results } = await migrator.migrateDown();

    results?.forEach((it) => {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was reverted successfully`,
        );
      } else if (it.status === 'Error') {
        console.error(`failed to revert "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error('failed to revert migrations');
      console.error(error);
      process.exit(1);
    }
  }
}
