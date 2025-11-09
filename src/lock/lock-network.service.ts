import { Injectable, BadRequestException } from '@nestjs/common';
import { LockService } from './lock.service';
import { TotemService } from '../totem/totem.service';
import { LockStatus } from './lock.entity';

@Injectable()
export class LockNetworkService {
  constructor(
    private readonly lockService: LockService,
    private readonly totemService: TotemService,
  ) {}

  async integrateLock(
    lockId: number,
    totemId: number,
    _employeeId: number,
  ): Promise<void> {
    // Validar tranca
    const lock = await this.lockService.findOne(lockId);

    if (
      lock.status !== LockStatus.NEW &&
      lock.status !== LockStatus.IN_REPAIR
    ) {
      throw new BadRequestException('Lock must have status NEW or IN_REPAIR');
    }

    // Validar totem
    await this.totemService.findOne(totemId);

    // Atualizar status da tranca para LIVRE
    await this.lockService.updateStatus(lockId, LockStatus.FREE);

    // Associar tranca ao totem
    await this.lockService.updateTotemAssociation(lockId, totemId);

    // TODO: Enviar email (mock - não implementado nesta entrega)
  }

  async removeLock(
    lockId: number,
    _totemId: number,
    _employeeId: number,
    action: string,
  ): Promise<void> {
    // Validar tranca
    const lock = await this.lockService.findOne(lockId);

    if (lock.bicycleId !== null) {
      throw new BadRequestException('Lock must not have any bicycle');
    }

    // Mapear ação para status
    const statusMap: Record<string, LockStatus> = {
      EM_REPARO: LockStatus.IN_REPAIR,
      APOSENTADA: LockStatus.RETIRED,
    };

    const newStatus = statusMap[action.toUpperCase()];
    if (!newStatus) {
      throw new BadRequestException('Invalid action');
    }

    // Atualizar status da tranca
    await this.lockService.updateStatus(lockId, newStatus);

    // Desassociar do totem
    await this.lockService.updateTotemAssociation(lockId, null);

    // TODO: Enviar email (mock - não implementado nesta entrega)
  }
}
