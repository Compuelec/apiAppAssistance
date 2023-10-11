import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClassEntryService } from './class-entry.service';
import { CreateClassEntryDto } from './dto/create-class-entry.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiTags('Class Entry')
@ApiBearerAuth()
@Controller('class-entry')
export class ClassEntryController {
  constructor(private readonly classEntryService: ClassEntryService) {}

  @Post()
  create(@Body() createClassEntryDto: CreateClassEntryDto) {
    return this.classEntryService.create(createClassEntryDto);
  }

  @Get()
  findAll() {
    return this.classEntryService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.classEntryService.findOne(_id);
  }

  @Auth(Role.TEACHER)
  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.classEntryService.remove(_id);
  }
}
