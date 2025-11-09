import { Test, TestingModule } from '@nestjs/testing';
import { TotemController } from './totem.controller';
import { TotemService } from './totem.service';

describe('TotemController', () => {
  let controller: TotemController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotemController],
      providers: [
        {
          provide: TotemService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TotemController>(TotemController);

    jest.clearAllMocks();
  });

  it('should create totem', async () => {
    const dto = { location: '-22.9068,-43.1729', description: 'Main Station' };
    const expected = { id: 1, ...dto };

    mockService.create.mockResolvedValue(expected);
    const result = await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should find all totems', async () => {
    const expected = [
      { id: 1, location: '-22.9068,-43.1729', description: 'Main Station' },
    ];
    mockService.findAll.mockResolvedValue(expected);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should find one totem', async () => {
    const expected = {
      id: 1,
      location: '-22.9068,-43.1729',
      description: 'Main Station',
    };
    mockService.findOne.mockResolvedValue(expected);

    const result = await controller.findOne('1');

    expect(mockService.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(expected);
  });

  it('should update totem', async () => {
    const dto = { description: 'Updated Station' };
    const expected = {
      id: 1,
      location: '-22.9068,-43.1729',
      description: 'Updated Station',
    };
    mockService.update.mockResolvedValue(expected);

    const result = await controller.update('1', dto);

    expect(mockService.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(expected);
  });

  it('should remove totem', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('1');

    expect(mockService.remove).toHaveBeenCalledWith(1);
  });
});
