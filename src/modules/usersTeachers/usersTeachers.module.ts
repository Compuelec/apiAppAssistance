import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeachers } from './entities/userTeachers.entity';
import { UsersTeachersController } from './usersTeachers.controller';
import { UsersServiceTeachers } from './usersTeachers.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeachers]), AuthModule],
  providers: [UsersServiceTeachers],
  controllers: [UsersTeachersController],
  exports: [TypeOrmModule],
})
export class UsersTeachersModule {}
