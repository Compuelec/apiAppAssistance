import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateClassEntryDto } from './dto/create-class-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntry } from './entities/class-entry.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AuthService } from '../../auth/auth.service';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class ClassEntryService {
  constructor(
    @InjectRepository(ClassEntry)
    private readonly classEntryRepository: Repository<ClassEntry>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  async create(createClassEntryDto: CreateClassEntryDto) {
    const { studentId, course, room, teacherId } = createClassEntryDto;

    const newClassEntry = new ClassEntry();
    newClassEntry._id = this.authService.cryptoIdKey();
    const student = await this.userRepository.findOneBy({
      _id: studentId,
      role: Role.STUDENT,
    });

    if (!student) {
      throw new BadRequestException('Student not found');
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const existingClassEntry = await this.classEntryRepository
      .createQueryBuilder('class_entry')
      .where('class_entry.course = :course', { course })
      .andWhere('class_entry.student = :studentId', { studentId })
      .andWhere('class_entry.room = :room', { room })
      .andWhere('DATE(class_entry.createdAt) = :currentDate', { currentDate })
      .getOne();

    if (existingClassEntry) {
      throw new BadRequestException(
        'The student has already been registered in this class',
      );
    }

    newClassEntry.student = student;
    newClassEntry.course = course;
    newClassEntry.room = room;

    const teacher = await this.userRepository.findOneBy({
      _id: teacherId,
      role: Role.TEACHER,
    });

    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    newClassEntry.teacher = teacher;

    await this.classEntryRepository.save(newClassEntry);
    return { message: 'Class Entry created successfully' };
  }

  async findAll() {
    const classEntry = await this.classEntryRepository
      .createQueryBuilder('classEntry')
      .leftJoinAndSelect('classEntry.student', 'student')
      .leftJoinAndSelect('classEntry.teacher', 'teacher')
      .select([
        'classEntry._id',
        'classEntry.course',
        'classEntry.room',
        'classEntry.createdAt',
        'student._id',
        'student.name',
        'student.lastNameM',
        'student.lastNameF',
        'teacher._id',
        'teacher.name',
        'teacher.lastNameM',
        'teacher.lastNameF',
      ])
      .getMany();
    return classEntry;
  }

  async findOne(_id: string) {
    return await this.classEntryRepository.findOneBy({ _id: _id });
  }

  async remove(_id: string) {
    await this.classEntryRepository.delete({ _id: _id });
  }
}
