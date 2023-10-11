import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ClassEntryService } from './class-entry.service';
import { ClassEntryController } from './class-entry.controller';
import { ClassEntry } from './entities/class-entry.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntry]), AuthModule, UsersModule],
  controllers: [ClassEntryController],
  providers: [ClassEntryService, UsersService],
  exports: [TypeOrmModule],
})
export class ClassEntryModule {}
