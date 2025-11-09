import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lock } from './lock.entity';
import { LockService } from './lock.service';
import { LockNetworkService } from './lock-network.service';
import { LockController } from './lock.controller';
import { TotemModule } from '../totem/totem.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lock]), TotemModule],
  controllers: [LockController],
  providers: [LockService, LockNetworkService],
  exports: [LockService],
})
export class LockModule {}
