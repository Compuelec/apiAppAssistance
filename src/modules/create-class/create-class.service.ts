import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-create-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClass } from './entities/create-class.entity';
import { User } from '../users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class CreateClassService {
  constructor(
    @InjectRepository(CreateClass)
    private readonly createClassRepository: Repository<CreateClass>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  async create(createClassDto: CreateClassDto) {
    const { course, room, idTeacher } = createClassDto;

    const newCreateClass = new CreateClass();
    newCreateClass._id = this.authService.cryptoIdKey();
    const teacher = await this.userRepository.findOneBy({
      _id: idTeacher,
      role: Role.TEACHER,
    });

    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    newCreateClass.teacher = teacher;
    newCreateClass.room = room;
    newCreateClass.course = course;

    await this.createClassRepository.save(newCreateClass);
    return newCreateClass;
  }

  async findAll() {
    const createClass = await this.createClassRepository
      .createQueryBuilder('create_class')
      .leftJoinAndSelect('create_class.teacher', 'teacher')
      .select([
        'create_class._id',
        'create_class.course',
        'create_class.room',
        'teacher._id',
        'teacher.name',
        'teacher.lastNameM',
        'teacher.lastNameF',
        'create_class.createdAt',
      ])
      .getMany();
    return createClass;
  }

  async findOne(_id: string) {
    return await this.createClassRepository.findOneBy({ _id: _id });
  }

  async remove(_id: string) {
    return this.createClassRepository.delete({ _id: _id });
  }
}
