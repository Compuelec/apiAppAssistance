import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthModule } from '../../auth/auth.module';
import { UsersStudentsModule } from '../usersStudents/usersStudents.module';
import { UsersTeachersModule } from '../usersTeachers/usersTeachers.module';
import { UsersServiceStudents } from '../usersStudents/usersStudents.service';
import { UsersServiceTeachers } from '../usersTeachers/usersTeachers.service';

@Module({
  imports: [AuthModule, UsersStudentsModule, UsersTeachersModule],
  controllers: [LoginController],
  providers: [LoginService, UsersServiceStudents, UsersServiceTeachers],
})
export class LoginModule {}
