import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStudents } from './entities/userStudents.entity';
import { UsersStudentsController } from './usersStudents.controller';
import { UsersService } from './usersStudents.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserStudents]), AuthModule],
  providers: [UsersService],
  controllers: [UsersStudentsController],
  exports: [TypeOrmModule],
})
export class UsersStudentsModule {}
