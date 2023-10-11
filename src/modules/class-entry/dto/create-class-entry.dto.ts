import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassEntryDto {
  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsString()
  room: string;

  @ApiProperty()
  @IsString()
  teacherId: string;
}
