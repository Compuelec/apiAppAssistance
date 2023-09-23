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
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(
    private readonly usersServiceTeachers: UsersService,
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
  @Post('')
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
}
