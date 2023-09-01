import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserStudentDto,
  UpdateUserStudentDto,
  LoginStudentDto,
} from './dto/userStudents.dto';
import { UserStudents } from './entities/userStudents.entity';
import { UsersService } from './usersStudents.service';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../common/enums/rol.enum';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ActiveUser } from '../../common/decorator/active-user.decorator';
import { UserActiveInterface } from '../../common/interfaces/user-active.interface';

@ApiTags('UsersStudents')
@Controller('userStudent')
export class UsersStudentsController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  //Section Login
  @ApiOperation({
    summary: 'Login user by email and password',
  })
  @ApiOkResponse({
    description: 'Login user',
  })
  @ApiNotFoundResponse({
    description:
      'Login failed. The provided credentials are incorrect or the user does not exist.',
  })
  @Post('login')
  async login(@Body() loginData: LoginStudentDto) {
    const user = await this.usersService.findOneByEmail(loginData.email);
    if (!user) {
      throw new HttpException(
        'Unauthorized access. Please provide valid credentials to access this resource',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const match = await this.usersService.compareHash(
      loginData.password,
      user.password,
    );
    if (!match) {
      throw new HttpException(
        'Unauthorized access. Please provide valid credentials to access this resource',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.authService.signIn(user);
    this.usersService.update(user._id, { token: token });
    return {
      token,
    };
  }

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

  @Auth(Role.TEACHER)
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('_id', ParseIntPipe) _id: string): Promise<UserStudents> {
    return this.usersService.findOne(_id);
  }

  @Auth(Role.TEACHER)
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

  @Auth(Role.TEACHER)
  @Get('email/:email')
  @ApiBearerAuth()
  async findOneByEmail(@Param('email') email: string): Promise<UserStudents> {
    return this.usersService.findOneByEmail(email);
  }
}
