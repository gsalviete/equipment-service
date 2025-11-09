import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { TotemService } from './totem.service';
import { CreateTotemDto } from './dto/create-totem.dto';
import { UpdateTotemDto } from './dto/update-totem.dto';

@Controller('totem')
export class TotemController {
  constructor(private readonly service: TotemService) {}

  @Post()
  create(@Body() dto: CreateTotemDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTotemDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
