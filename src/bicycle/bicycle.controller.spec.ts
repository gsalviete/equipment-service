import { Test, TestingModule } from '@nestjs/testing';
import { BicycleController } from './bicycle.controller';
import { BicycleService } from './bicycle.service';
import { BicycleStatus } from './bicycle.entity';

describe('BicycleController', () => {
  let controller: BicycleController;
  let service: BicycleService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleController],
      providers: [
        {
          provide: BicycleService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BicycleController>(BicycleController);
    service = module.get<BicycleService>(BicycleService);

    jest.clearAllMocks();
  });

  it('should create bicycle', async () => {
    const dto = { brand: 'Caloi', model: 'Elite', year: '2023' };
    const expected = { id: 1, ...dto, number: 1, status: BicycleStatus.NEW };
    
    mockService.create.mockResolvedValue(expected);

    const result = await controller.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should find all bicycles', async () => {
    const expected = [{ id: 1, brand: 'Caloi', model: 'Elite', year: '2023', number: 1, status: BicycleStatus.NEW }];
    mockService.findAll.mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(result).toEqual(expected);
  });

  it('should find one bicycle', async () => {
    const expected = { id: 1, brand: 'Caloi', model: 'Elite', year: '2023', number: 1, status: BicycleStatus.NEW };
    mockService.findOne.mockResolvedValue(expected);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(expected);
  });

  it('should update bicycle', async () => {
    const dto = { brand: 'Specialized' };
    const expected = { id: 1, brand: 'Specialized', model: 'Elite', year: '2023', number: 1, status: BicycleStatus.NEW };
    mockService.update.mockResolvedValue(expected);

    const result = await controller.update('1', dto);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(expected);
  });

  it('should remove bicycle', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should update bicycle status', async () => {
    const expected = { id: 1, status: BicycleStatus.AVAILABLE };
    mockService.updateStatus.mockResolvedValue(expected);

    const result = await controller.updateStatus('1', 'DISPONIVEL');

    expect(service.updateStatus).toHaveBeenCalledWith(1, BicycleStatus.AVAILABLE);
    expect(result).toEqual(expected);
  });
});