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
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../common/enums/rol.enum';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ActiveUser } from '../../common/decorator/active-user.decorator';
import { UserActiveInterface } from '../../common/interfaces/user-active.interface';

@ApiTags('Users')
@Controller('user')
export class UsersTeachersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('create')
  create(@Body() createUser: CreateUserDto): Promise<User> {
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
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('_id') _id: string): Promise<User> {
    return this.usersService.findOne(_id);
  }

  @Auth(Role.TEACHER)
  @Put('edit/:_id')
  @ApiBearerAuth()
  update(
    @Param('_id') _id: string,
    @Body() updateUser: UpdateUserDto,
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
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}
