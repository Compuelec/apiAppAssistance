import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersServiceTeachers } from '../usersTeachers/usersTeachers.service';
import { UsersServiceStudents } from '../usersStudents/usersStudents.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private readonly usersServiceTeachers: UsersServiceTeachers,
    private readonly usersServiceStudents: UsersServiceStudents,
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}
  @ApiOperation({
    summary: 'Login user by email and password',
  })
  @ApiOkResponse({
    description: 'Login user Teacher',
  })
  @ApiNotFoundResponse({
    description:
      'Login failed. The provided credentials are incorrect or the user does not exist.',
  })
  @Post('teachers')
  async loginTeachers(@Body() loginData: LoginDto) {
    const user = await this.usersServiceTeachers.findOneByEmail(
      loginData.email,
    );
    if (!user) {
      throw new HttpException(
        'Unauthorized access. Please provide valid credentials to access this resource',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const match = await this.usersServiceTeachers.compareHash(
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
    this.usersServiceTeachers.update(user._id, { token: token });
    return {
      token,
    };
  }

  @ApiOperation({
    summary: 'Login user by email and password',
  })
  @ApiOkResponse({
    description: 'Login user Students',
  })
  @ApiNotFoundResponse({
    description:
      'Login failed. The provided credentials are incorrect or the user does not exist.',
  })
  @Post('students')
  async loginStudents(@Body() loginData: LoginDto) {
    const user = await this.usersServiceStudents.findOneByEmail(
      loginData.email,
    );
    if (!user) {
      throw new HttpException(
        'Unauthorized access. Please provide valid credentials to access this resource',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const match = await this.usersServiceStudents.compareHash(
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
    this.usersServiceStudents.update(user._id, { token: token });
    return {
      token,
    };
  }
}
