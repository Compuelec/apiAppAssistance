import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClassEntry } from '../class-entry/entities/class-entry.entity';
import { ClassEntryService } from '../class-entry/class-entry.service';
import { CreateClass } from '../create-class/entities/create-class.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InitializationService } from './initialization.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ClassEntry, CreateClass]),
    AuthModule,
  ],
  providers: [UsersService, InitializationService, ClassEntryService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
