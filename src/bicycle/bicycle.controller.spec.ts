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
});