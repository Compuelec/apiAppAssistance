import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateClassService } from './create-class.service';
import { CreateClassController } from './create-class.controller';
import { CreateClass } from './entities/create-class.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreateClass]), AuthModule, UsersModule],
  controllers: [CreateClassController],
  providers: [CreateClassService, UsersService],
  exports: [TypeOrmModule],
})
export class CreateClassModule {}
