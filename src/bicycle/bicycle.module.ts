import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from './bicycle.entity';
import { BicycleService } from './bicycle.service';
import { BicycleController } from './bicycle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bicycle])],
  controllers: [BicycleController],
  providers: [BicycleService],
  exports: [BicycleService], // <-- adicione
})
export class BicycleModule {}
