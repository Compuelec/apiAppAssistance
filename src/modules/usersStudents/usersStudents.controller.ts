import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateUserStudentDto,
  UpdateUserStudentDto,
} from './dto/userStudents.dto';
import { UserStudents } from './entities/userStudents.entity';
import { UsersServiceStudents } from './usersStudents.service';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../common/enums/rol.enum';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ActiveUser } from '../../common/decorator/active-user.decorator';
import { UserActiveInterface } from '../../common/interfaces/user-active.interface';

@ApiTags('Students')
@Controller('userStudent')
export class UsersStudentsController {
  constructor(
    private readonly usersService: UsersServiceStudents,
    private authService: AuthService,
  ) {}

  @Auth(Role.TEACHER)
  @Post('create')
  @ApiBearerAuth()
  create(@Body() createUser: CreateUserStudentDto): Promise<UserStudents> {
    return this.usersService.create(createUser);
  }

  @Get('profile')
  @Auth(Role.STUDENT)
  @ApiBearerAuth()
  getProfile(@ActiveUser() user: UserActiveInterface) {
    return user;
  }

  @Auth(Role.TEACHER)
  @Get()
  @ApiBearerAuth()
  findAll(): Promise<UserStudents[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('_id') _id: string): Promise<UserStudents> {
    return this.usersService.findOne(_id);
  }

  @Auth(Role.STUDENT)
  @Put('edit/:_id')
  @ApiBearerAuth()
  update(
    @Param('_id') _id: string,
    @Body() updateUser: UpdateUserStudentDto,
  ): Promise<string> {
    return this.usersService.update(_id, updateUser);
  }

  @Auth(Role.TEACHER)
  @Delete('delete/:_id')
  @ApiBearerAuth()
  async remove(@Param('_id') _idUserDelete: string): Promise<string> {
    return this.usersService.remove(_idUserDelete);
  }

  @Get('email/:email')
  @ApiBearerAuth()
  async findOneByEmail(@Param('email') email: string): Promise<UserStudents> {
    return this.usersService.findOneByEmail(email);
  }
}
