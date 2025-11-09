import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum LockStatus {
  FREE = 'LIVRE',
  OCCUPIED = 'OCUPADA',
  NEW = 'NOVA',
  RETIRED = 'APOSENTADA',
  IN_REPAIR = 'EM_REPARO',
}

@Entity('locks')
export class Lock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: number;

  @Column()
  location: string;

  @Column()
  manufactureYear: string;

  @Column()
  model: string;

  @Column({
    type: 'enum',
    enum: LockStatus,
    default: LockStatus.NEW,
  })
  status: LockStatus;

  @Column({ nullable: true })
  bicycleId: number | null;
}
