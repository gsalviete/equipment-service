import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lock } from './lock.entity';
import { LockService } from './lock.service';
import { LockNetworkService } from './lock-network.service';
import { LockController } from './lock.controller';
import { BicycleModule } from '../bicycle/bicycle.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lock]), forwardRef(() => BicycleModule)],
  controllers: [LockController],
  providers: [LockService, LockNetworkService],
  exports: [LockService, LockNetworkService],
})
export class LockModule {}
