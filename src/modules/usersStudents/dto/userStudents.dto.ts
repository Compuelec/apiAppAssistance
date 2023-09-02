import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../common/enums/rol.enum';
export class CreateUserStudentDto {
  @Transform(({ value }) => value.trim())
  @ApiProperty()
  @IsString()
  @MinLength(6)
  rut: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty()
  @IsString()
  @MinLength(4)
  username: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty()
  @IsString()
  @MinLength(4)
  lastNameM: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty()
  @IsString()
  @MinLength(4)
  lastNameF: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  role?: Role;

  @IsBoolean()
  @ApiProperty({ required: false })
  @IsOptional()
  isVerified?: boolean;

  @IsBoolean()
  @ApiProperty({ required: false })
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  token?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  avatar?: string;
}
export class UpdateUserStudentDto {
  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  rut?: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastNameM?: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastNameF?: string;

  @Transform(({ value }) => value.trim())
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  role?: Role;

  @IsBoolean()
  @ApiProperty({ required: false })
  @IsOptional()
  isVerified?: boolean;

  @IsBoolean()
  @ApiProperty({ required: false })
  @IsOptional()
  isActive?: boolean;

  @IsString()
  token?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  avatar?: string;
}
