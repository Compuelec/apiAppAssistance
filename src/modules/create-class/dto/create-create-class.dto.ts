import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsString()
  room: string;

  @ApiProperty()
  @IsString()
  idTeacher: string;
}
