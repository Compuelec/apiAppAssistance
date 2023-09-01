import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeachers } from './entities/userTeachers.entity';
import { UsersController } from './usersTeachers.controller';
import { UsersService } from './usersTeachers.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeachers]), AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersTeachersModule {}
