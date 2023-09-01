import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { JwtExpiredFilter } from './filters/jwt-expired.filter';
import { JwtExceptionFilter } from './filters/jwt-exception.filter';
import { UsersStudentsModule } from './modules/usersStudents/usersStudents.module';
import { UsersTeachersModule } from './modules/usersTeachers/usersTeachers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersStudentsModule,
    UsersTeachersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JwtExpiredFilter,
    },
    {
      provide: APP_FILTER,
      useClass: JwtExceptionFilter,
    },
  ],
})
export class AppModule {}
