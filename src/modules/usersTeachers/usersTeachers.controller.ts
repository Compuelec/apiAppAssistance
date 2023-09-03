import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateUserTeachersDto,
  UpdateUserTeachersDto,
} from './dto/userTeachers.dto';
import { UserTeachers } from './entities/userTeachers.entity';
import { UsersServiceTeachers } from './usersTeachers.service';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../common/enums/rol.enum';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ActiveUser } from '../../common/decorator/active-user.decorator';
import { UserActiveInterface } from '../../common/interfaces/user-active.interface';

@ApiTags('Teachers')
@Controller('userTeacher')
export class UsersTeachersController {
  constructor(
    private readonly usersService: UsersServiceTeachers,
    private authService: AuthService,
  ) {}

  // @Auth(Role.TEACHER)
  @Post('create')
  create(@Body() createUser: CreateUserTeachersDto): Promise<UserTeachers> {
    return this.usersService.create(createUser);
  }

  @Get('profile')
  @Auth(Role.TEACHER)
  @ApiBearerAuth()
  getProfile(@ActiveUser() user: UserActiveInterface) {
    return user;
  }

  @Auth(Role.TEACHER)
  @Get()
  @ApiBearerAuth()
  findAll(): Promise<UserTeachers[]> {
    return this.usersService.findAll();
  }

  @Auth(Role.TEACHER)
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('_id', ParseIntPipe) _id: string): Promise<UserTeachers> {
    return this.usersService.findOne(_id);
  }

  @Auth(Role.TEACHER)
  @Put('edit/:_id')
  @ApiBearerAuth()
  update(
    @Param('_id') _id: string,
    @Body() updateUser: UpdateUserTeachersDto,
  ): Promise<string> {
    return this.usersService.update(_id, updateUser);
  }

  @Auth(Role.TEACHER)
  @Delete('delete/:_id')
  @ApiBearerAuth()
  async remove(@Param('_id') _idUserDelete: string): Promise<string> {
    return this.usersService.remove(_idUserDelete);
  }

  @Auth(Role.TEACHER)
  @Get('email/:email')
  @ApiBearerAuth()
  async findOneByEmail(@Param('email') email: string): Promise<UserTeachers> {
    return this.usersService.findOneByEmail(email);
  }
}
