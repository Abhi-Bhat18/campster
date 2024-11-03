import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { NewUser, UserUpdate } from 'src/schemas/user.schema';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private readonly dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  findById = async (id: string) => {
    return await this.db
      .selectFrom('users')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  };

  findByIdAndUpdate = async (id: string, values: UserUpdate) => {
    return await this.db
      .updateTable('users')
      .where('id', '=', id)
      .set(values)
      .returning(['email', 'first_name', 'last_name', 'users.id', 'contact'])
      .executeTakeFirst();
  };

  findByEmail = async (email: string) => {
    return await this.db
      .selectFrom('users')
      .where('email', '=', email)
      .select(['email', 'first_name', 'last_name', 'id', 'password'])
      .executeTakeFirst();
  };

  findByIdAndJoinRole = async (id: string) => {
    return await this.db
      .selectFrom('users')
      .where('users.id', '=', id)
      .innerJoin('roles', 'roles.id', 'users.role_id')
      .select([
        'email',
        'first_name',
        'last_name',
        'users.id',
        'password',
        'contact',
        'role_id',
        'roles.name as role',
        'roles.permissions',
      ])
      .executeTakeFirst();
  };

  createUser = async (user: NewUser) => {
    return await this.db
      .insertInto('users')
      .values(user)
      .returningAll()
      .executeTakeFirst();
  };

  getAllUsers = async () => {
    return await this.db.selectFrom('users').selectAll().execute();
  };

  updateRefreshToken = async (id: string, refreshToken: string) => {
    return await this.db
      .updateTable('users')
      .set({
        refresh_token: refreshToken,
      })
      .where('id', '=', id)
      .executeTakeFirst();
  };

  deleteRefreshToken = async (id: string) => {
    return await this.db
      .updateTable('users')
      .set({ refresh_token: null })
      .where('id', '=', id)
      .executeTakeFirst();
  };

  updatePassword = async (body: UpdatePasswordDto, id: string) => {
    const { current_password, new_password, confirm_password } = body;
    if (new_password !== confirm_password)
      throw new HttpException(
        'New password and confirm password should match',
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.findById(id);

    const isPasswordCorrect = await bcrypt.compare(
      current_password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    if (hashedPassword == user.password)
      throw new HttpException(
        'New password can not be same as current password',
        HttpStatus.BAD_REQUEST,
      );

    await this.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
  };
}
