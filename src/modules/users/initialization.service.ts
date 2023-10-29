import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class InitializationService {
  constructor(private readonly usersService: UsersService) {}

  async initializeApp() {
    const adminUsers = await this.usersService.findAllSelect({
      role: Role.ADMIN,
    });
    const studentUsers = await this.usersService.findAllSelect({
      role: Role.STUDENT,
    });
    const teacherUsers = await this.usersService.findAllSelect({
      role: Role.TEACHER,
    });

    if (adminUsers.length === 0) {
      const defaultAdminUser: CreateUserDto = {
        rut: '11111111-1',
        username: 'admin',
        name: 'Administrador',
        lastNameM: 'Administrador',
        lastNameF: 'Administrador',
        email: 'admin@gmail.com',
        password: '123456789',
        role: Role.ADMIN,
      };
      await this.usersService.create(defaultAdminUser);
    }

    if (studentUsers.length === 0) {
      const defaultStudentUser: CreateUserDto = {
        rut: '22222222-2',
        username: 'student',
        name: 'Estudiante',
        lastNameM: 'Estudiante',
        lastNameF: 'Estudiante',
        email: 'estudiante@gmail.com',
        password: '123456789',
        role: Role.STUDENT,
      };
      await this.usersService.create(defaultStudentUser);
    }

    if (teacherUsers.length === 0) {
      const defaultTeacherUser: CreateUserDto = {
        rut: '33333333-3',
        username: 'teacher',
        name: 'Profesor',
        lastNameM: 'Profesor',
        lastNameF: 'Profesor',
        email: 'profesor@gmail.com',
        password: '123456789',
        role: Role.TEACHER,
      };
      await this.usersService.create(defaultTeacherUser);
    }
  }
}
