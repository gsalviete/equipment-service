import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Totem } from './totem.entity';
import { TotemService } from './totem.service';
import { TotemController } from './totem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Totem])],
  controllers: [TotemController],
  providers: [TotemService],
})
export class TotemModule {}
