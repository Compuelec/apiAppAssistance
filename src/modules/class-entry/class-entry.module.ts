import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { CreateClassModule } from '../create-class/create-class.module';
import { CreateClassService } from '../create-class/create-class.service';
import { ClassEntryService } from './class-entry.service';
import { ClassEntryController } from './class-entry.controller';
import { ClassEntry } from './entities/class-entry.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassEntry]),
    AuthModule,
    UsersModule,
    CreateClassModule,
  ],
  controllers: [ClassEntryController],
  providers: [ClassEntryService, CreateClassService, UsersService],
  exports: [TypeOrmModule],
})
export class ClassEntryModule {}
