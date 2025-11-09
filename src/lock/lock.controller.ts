import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { LockService } from './lock.service';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';
import { LockStatus } from './lock.entity';

@Controller('tranca')
export class LockController {
  constructor(private readonly service: LockService) {}

  @Post()
  create(@Body() dto: CreateLockDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateLockDto) {
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
      LIVRE: LockStatus.FREE,
      OCUPADA: LockStatus.OCCUPIED,
      NOVA: LockStatus.NEW,
      APOSENTADA: LockStatus.RETIRED,
      EM_REPARO: LockStatus.IN_REPAIR,
    };
    return this.service.updateStatus(+id, statusMap[action]);
  }

  @Post(':id/trancar')
  lockBicycle(@Param('id') id: string, @Body() body: { bicicleta?: number }) {
    return this.service.lockBicycle(+id, body.bicicleta);
  }

  @Post(':id/destrancar')
  unlockBicycle(@Param('id') id: string) {
    return this.service.unlockBicycle(+id);
  }

  @Get(':id/bicicleta')
  getBicycle(@Param('id') id: string) {
    return this.service.getBicycle(+id);
  }
}