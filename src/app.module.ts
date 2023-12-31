import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { JwtExpiredFilter } from './filters/jwt-expired.filter';
import { JwtExceptionFilter } from './filters/jwt-exception.filter';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { ClassEntryModule } from './modules/class-entry/class-entry.module';
import { CreateClassModule } from './modules/create-class/create-class.module';
import { InitializationService } from './modules/users/initialization.service';
import * as cors from 'cors';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl:
          process.env.DB_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UsersModule,
    LoginModule,
    ClassEntryModule,
    CreateClassModule,
  ],
  controllers: [],
  providers: [
    NotificationsGateway,
    InitializationService,
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
export class AppModule implements NestModule {
  constructor(private readonly initializationService: InitializationService) {}

  async onApplicationBootstrap() {
    await this.initializationService.initializeApp();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
