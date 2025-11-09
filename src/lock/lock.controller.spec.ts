import { Test, TestingModule } from '@nestjs/testing';
import { LockController } from './lock.controller';
import { LockService } from './lock.service';
import { LockStatus } from './lock.entity';

describe('LockController', () => {
  let controller: LockController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateStatus: jest.fn(),
    lockBicycle: jest.fn(),
    unlockBicycle: jest.fn(),
    getBicycle: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockController],
      providers: [
        {
          provide: LockService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LockController>(LockController);

    jest.clearAllMocks();
  });

  it('should create lock', async () => {
    const dto = {
      location: '-22.9068,-43.1729',
      manufactureYear: '2023',
      model: 'Model X',
    };
    const expected = { id: 1, ...dto, number: 1, status: LockStatus.NEW };

    mockService.create.mockResolvedValue(expected);
    const result = await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should find all locks', async () => {
    const expected = [
      {
        id: 1,
        location: '-22.9068,-43.1729',
        manufactureYear: '2023',
        model: 'Model X',
        number: 1,
        status: LockStatus.NEW,
      },
    ];
    mockService.findAll.mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should find one lock', async () => {
    const expected = {
      id: 1,
      location: '-22.9068,-43.1729',
      manufactureYear: '2023',
      model: 'Model X',
      number: 1,
      status: LockStatus.NEW,
    };
    mockService.findOne.mockResolvedValue(expected);

    const result = await controller.findOne('1');

    expect(mockService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(expected);
  });

  it('should update lock', async () => {
    const dto = { model: 'Model Y' };
    const expected = {
      id: 1,
      location: '-22.9068,-43.1729',
      manufactureYear: '2023',
      model: 'Model Y',
      number: 1,
      status: LockStatus.NEW,
    };

    mockService.update.mockResolvedValue(expected);
    const result = await controller.update('1', dto);

    expect(mockService.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(expected);
  });

  it('should remove lock', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(mockService.remove).toHaveBeenCalledWith(1);
  });

  it('should update lock status to FREE on DESTRANCAR action', async () => {
    const expected = { id: 1, status: LockStatus.FREE };
    mockService.updateStatus.mockResolvedValue(expected);

    const result = await controller.updateStatus('1', 'DESTRANCAR');

    expect(mockService.updateStatus).toHaveBeenCalledWith(1, LockStatus.FREE);
    expect(result).toEqual(expected);
  });

  it('should update lock status to OCCUPIED on TRANCAR action', async () => {
    const expected = { id: 1, status: LockStatus.OCCUPIED };
    mockService.updateStatus.mockResolvedValue(expected);

    const result = await controller.updateStatus('1', 'TRANCAR');

    expect(mockService.updateStatus).toHaveBeenCalledWith(
      1,
      LockStatus.OCCUPIED,
    );
    expect(result).toEqual(expected);
  });

  it('should lock bicycle', async () => {
    const expected = { id: 1, status: LockStatus.OCCUPIED, bicycleId: 5 };
    mockService.lockBicycle.mockResolvedValue(expected);

    const result = await controller.lockBicycle('1', { bicicleta: 5 });

    expect(mockService.lockBicycle).toHaveBeenCalledWith(1, 5);
    expect(result).toEqual(expected);
  });

  it('should unlock bicycle', async () => {
    const expected = { id: 1, status: LockStatus.FREE, bicycleId: null };
    mockService.unlockBicycle.mockResolvedValue(expected);

    const result = await controller.unlockBicycle('1');

    expect(mockService.unlockBicycle).toHaveBeenCalledWith(1);
    expect(result).toEqual(expected);
  });

  it('should get bicycle from lock', async () => {
    mockService.getBicycle.mockResolvedValue(5);

    const result = await controller.getBicycle('1');

    expect(mockService.getBicycle).toHaveBeenCalledWith(1);
    expect(result).toBe(5);
  });
});
