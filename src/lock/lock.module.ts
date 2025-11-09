import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lock } from './lock.entity';
import { LockService } from './lock.service';
import { LockController } from './lock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lock])],
  controllers: [LockController],
  providers: [LockService],
  exports: [LockService], // <-- adicione
})
export class LockModule {}
