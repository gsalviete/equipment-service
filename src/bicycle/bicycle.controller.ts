import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { CreateBicycleDto } from './dto/create-bicycle.dto';
import { UpdateBicycleDto } from './dto/update-bicycle.dto';
import { BicycleStatus } from './bicycle.entity';

@Controller('bicicleta')
export class BicycleController {
  constructor(private readonly service: BicycleService) {}

  @Post()
  create(@Body() dto: CreateBicycleDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateBicycleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Post(':id/status/:action')
  updateStatus(@Param('id') id: string, @Param('action') action: string) {
    const statusMap = {
      DISPONIVEL: BicycleStatus.AVAILABLE,
      EM_USO: BicycleStatus.IN_USE,
      NOVA: BicycleStatus.NEW,
      APOSENTADA: BicycleStatus.RETIRED,
      REPARO_SOLICITADO: BicycleStatus.REPAIR_REQUESTED,
      EM_REPARO: BicycleStatus.IN_REPAIR,
    };
    return this.service.updateStatus(+id, statusMap[action]);
  }
}