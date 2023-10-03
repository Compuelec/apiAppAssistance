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

export class CreateUserDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  rut: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  lastNameM: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  lastNameF: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @ApiProperty({ required: false })
  role?: Role;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive?: boolean;

  @IsString()
  @IsOptional()
  token?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  avatar?: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  rut?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  lastNameM?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  lastNameF?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: Role;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  token?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;
}
