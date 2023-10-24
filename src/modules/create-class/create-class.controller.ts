import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateClassService } from './create-class.service';
import { CreateClassDto } from './dto/create-create-class.dto';

@Controller('create-class')
export class CreateClassController {
  constructor(private readonly createClassService: CreateClassService) {}

  @Post()
  create(@Body() createCreateClassDto: CreateClassDto) {
    return this.createClassService.create(createCreateClassDto);
  }

  @Get()
  findAll() {
    return this.createClassService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.createClassService.findOne(_id);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.createClassService.remove(_id);
  }
}
