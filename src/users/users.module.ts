import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from '../common/database/database.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { S3Module } from '../common/s3/s3.module';

@Module({
  imports: [
    S3Module,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
