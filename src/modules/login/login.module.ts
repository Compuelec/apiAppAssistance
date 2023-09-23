import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [LoginController],
  providers: [LoginService, UsersService],
})
export class LoginModule {}
