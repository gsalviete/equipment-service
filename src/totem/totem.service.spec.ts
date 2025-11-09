import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TotemService } from './totem.service';
import { Totem } from './totem.entity';
import { NotFoundException } from '@nestjs/common';

describe('TotemService', () => {
  let service: TotemService;
  let repo: Repository<Totem>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TotemService,
        {
          provide: getRepositoryToken(Totem),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<TotemService>(TotemService);
    repo = module.get<Repository<Totem>>(getRepositoryToken(Totem));

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create totem', async () => {
      const dto = { location: '-22.9068,-43.1729', description: 'Main Station' };
      
      mockRepo.create.mockReturnValue(dto);
      mockRepo.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(result.id).toBe(1);
      expect(result.location).toBe(dto.location);
    });
  });

  describe('findAll', () => {
    it('should return array of totems', async () => {
      const totems = [
        { id: 1, location: '-22.9068,-43.1729', description: 'Main Station' },
      ];
      mockRepo.find.mockResolvedValue(totems);

      const result = await service.findAll();

      expect(result).toEqual(totems);
    });
  });

  describe('findOne', () => {
    it('should return totem if found', async () => {
      const totem = { id: 1, location: '-22.9068,-43.1729', description: 'Main Station' };
      mockRepo.findOneBy.mockResolvedValue(totem);

      const result = await service.findOne(1);

      expect(result).toEqual(totem);
    });

    it('should throw NotFoundException if not found', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update totem', async () => {
      const totem = { id: 1, location: '-22.9068,-43.1729', description: 'Main Station' };
      const dto = { description: 'Updated Station' };
      
      mockRepo.findOneBy.mockResolvedValue(totem);
      mockRepo.save.mockResolvedValue({ ...totem, ...dto });

      const result = await service.update(1, dto);

      expect(result.description).toBe('Updated Station');
    });

    it('should throw NotFoundException if totem not found', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.update(999, { description: 'Test' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove totem', async () => {
      const totem = { id: 1, location: '-22.9068,-43.1729', description: 'Main Station' };
      mockRepo.findOneBy.mockResolvedValue(totem);
      mockRepo.remove.mockResolvedValue(totem);

      await service.remove(1);

      expect(mockRepo.remove).toHaveBeenCalledWith(totem);
    });

    it('should throw NotFoundException if totem not found', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
