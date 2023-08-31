import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Para usar en desarrollo para usar en prod y docker, cambiar a 'mysql'
      port: 3307, // Para usar en desarrollo para usar en prod y docker, cambiar a 3306
      // host: 'mysql', // Nombre del servicio en el docker-compose.yml (si se usa docker)
      // port: 3306,  // Puerto expuesto en el docker-compose.yml (si se usa docker)
      username: 'admin',
      password: 'admin123',
      database: 'control_asistencia_db',
      autoLoadEntities: true, // Carga las entidades de forma automática
      synchronize: false, // Evita que se sincronicen los modelos con la base de datos
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
