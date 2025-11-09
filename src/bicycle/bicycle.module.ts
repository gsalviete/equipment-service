import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bicycle } from './bicycle.entity';
import { BicycleService } from './bicycle.service';
import { BicycleController } from './bicycle.controller';
import { BicycleNetworkService } from './bicycle-network.service';
import { LockModule } from '../lock/lock.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bicycle]), LockModule],
  controllers: [BicycleController],
  providers: [BicycleService, BicycleNetworkService],
  exports: [BicycleService],
})
export class BicycleModule {}
