import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateClassEntryDto } from './dto/create-class-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntry } from './entities/class-entry.entity';
import { CreateClass } from '../create-class/entities/create-class.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AuthService } from '../../auth/auth.service';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class ClassEntryService {
  constructor(
    @InjectRepository(ClassEntry)
    private readonly classEntryRepository: Repository<ClassEntry>,

    @InjectRepository(CreateClass)
    private readonly createClassRepository: Repository<CreateClass>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  async create(createClassEntryDto: CreateClassEntryDto) {
    const { studentId, classId } = createClassEntryDto;

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
      .where('class_entry.student = :studentId', { studentId })
      .andWhere('class_entry.class = :classId', { classId })
      .getOne();

    if (existingClassEntry) {
      throw new BadRequestException(
        'The student has already been registered in this class',
      );
    }

    const classEntry = await this.createClassRepository.findOneBy({
      _id: classId,
    });

    if (!classEntry) {
      throw new BadRequestException('Class not found');
    }

    newClassEntry.student = student;
    newClassEntry.class = classEntry;

    await this.classEntryRepository.save(newClassEntry);
    return { message: 'Class Entry created successfully' };
  }

  async findAll() {
    const classEntry = await this.classEntryRepository
      .createQueryBuilder('classEntry')
      .leftJoinAndSelect('classEntry.student', 'student')
      .leftJoinAndSelect('classEntry.class', 'class')
      .leftJoinAndSelect('class.teacher', 'teacher')
      .select([
        'classEntry._id',
        'classEntry.createdAt',
        'student._id',
        'student.name',
        'student.lastNameM',
        'student.lastNameF',
        'class._id',
        'class.course',
        'class.room',
        'teacher._id',
        'teacher.name',
        'teacher.lastNameM',
        'teacher.lastNameF',
      ])
      .getMany();
    return classEntry;
  }

  async findStudentClassEntries(_id: string) {
    const createClass = await this.createClassRepository.findOneBy({
      _id: _id,
    });

    if (!createClass) {
      throw new BadRequestException('Class not found');
    }

    const studentClassEntries = await this.classEntryRepository
      .createQueryBuilder('classEntry')
      .leftJoinAndSelect('classEntry.student', 'student')
      .leftJoinAndSelect('classEntry.class', 'class')
      .leftJoinAndSelect('class.teacher', 'teacher')
      .where('classEntry.class = :classId', { classId: _id })
      .select([
        'classEntry._id',
        'classEntry.createdAt',
        'student._id',
        'student.name',
        'student.lastNameM',
        'student.lastNameF',
        'class._id',
        'class.course',
        'class.room',
        'teacher._id',
        'teacher.name',
        'teacher.lastNameM',
        'teacher.lastNameF',
      ])
      .getMany();

    return studentClassEntries;
  }

  async findOne(_id: string) {
    return await this.classEntryRepository.findOneBy({ _id: _id });
  }

  async remove(_id: string) {
    await this.classEntryRepository.delete({ _id: _id });
  }
}
