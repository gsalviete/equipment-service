import { Injectable, BadRequestException } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { LockService } from '../lock/lock.service';
import { BicycleStatus } from './bicycle.entity';
import { LockStatus } from '../lock/lock.entity';

@Injectable()
export class BicycleNetworkService {
  constructor(
    private readonly bicycleService: BicycleService,
    private readonly lockService: LockService,
  ) {}

  async integrateBicycle(
    bicycleId: number,
    lockId: number,
    _employeeId: number, // <-- CORREÇÃO AQUI
  ): Promise<void> {
    // Validar bicicleta
    const bicycle = await this.bicycleService.findOne(bicycleId);

    if (
      bicycle.status !== BicycleStatus.NEW &&
      bicycle.status !== BicycleStatus.IN_REPAIR
    ) {
      throw new BadRequestException(
        'Bicycle must have status NEW or IN_REPAIR',
      );
    } // Validar tranca

    const lock = await this.lockService.findOne(lockId);

    if (lock.status !== LockStatus.FREE) {
      throw new BadRequestException('Lock must be FREE');
    } // Atualizar status da bicicleta

    await this.bicycleService.updateStatus(bicycleId, BicycleStatus.AVAILABLE); // Trancar a bicicleta

    await this.lockService.lockBicycle(lockId, bicycleId); // TODO: Enviar email (mock - não implementado nesta entrega)
  }

  async removeBicycle(
    bicycleId: number,
    lockId: number,
    _employeeId: number, // <-- CORREÇÃO AQUI
    action: string,
  ): Promise<void> {
    // Validar bicicleta
    const bicycle = await this.bicycleService.findOne(bicycleId);

    if (bicycle.status !== BicycleStatus.REPAIR_REQUESTED) {
      throw new BadRequestException(
        'Bicycle must have status REPAIR_REQUESTED',
      );
    } // Validar tranca

    const lock = await this.lockService.findOne(lockId);

    if (lock.bicycleId !== bicycleId) {
      throw new BadRequestException('Lock does not have this bicycle');
    } // Mapear ação para status

    const statusMap: Record<string, BicycleStatus> = {
      EM_REPARO: BicycleStatus.IN_REPAIR,
      APOSENTADA: BicycleStatus.RETIRED,
    };

    const newStatus = statusMap[action.toUpperCase()];
    if (!newStatus) {
      throw new BadRequestException('Invalid action');
    } // Atualizar status da bicicleta

    await this.bicycleService.updateStatus(bicycleId, newStatus); // Destrancar

    await this.lockService.unlockBicycle(lockId); // TODO: Enviar email (mock - não implementado nesta entrega)
  }
}
