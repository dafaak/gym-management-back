import { Test, TestingModule } from '@nestjs/testing';
import { GymService } from './gym.service';
import { Repository, UpdateResult } from 'typeorm';
import { Gym } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';
import { REPOSITORIES } from '../const/repositories';
import { BadRequestException, HttpException } from '@nestjs/common';
import { UpdateGymDto } from './dto/update-gym.dto';

describe('GymService', () => {
  let service: GymService;

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
  };

  const repositoryMock = {
    find: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<Repository<Gym>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GymService,
        {
          provide: REPOSITORIES.gym, // Inyección del mock
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<GymService>(GymService) as GymService;
    (service as any).logger = mockLogger;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save a gym and return it', async () => {
      const createGymDto: CreateGymDto = {
        name: 'Test Gym',
        phone: '+5934567890',
        email: 'test@gym.com',
      };

      const mockedResponse = {
        message: 'CREATED',
        status: true,
      };
      const savedGym = { id: 1, ...createGymDto };
      repositoryMock.save.mockResolvedValue(savedGym); // Mock del método `save`

      const result = await service.create(createGymDto);

      expect(repositoryMock.save).toHaveBeenCalledWith(createGymDto); // Verifica que se llamó `save` con el DTO
      expect(result).toEqual(mockedResponse); // Verifica el resultado esperado
    });
  });

  describe('findAll', () => {
    it('should return an array of gyms', async () => {
      const gyms = [
        { id: 1, name: 'Gym 1', phone: '+1234567890', email: 'gym1@test.com' },
        { id: 2, name: 'Gym 2', phone: '+0987654321', email: 'gym2@test.com' },
      ];

      repositoryMock.find.mockResolvedValue(gyms); // Mock del método `find`

      const result = await service.findAll();

      expect(repositoryMock.find).toHaveBeenCalled(); // Verifica que se llamó `find`
      expect(result).toEqual(gyms); // Verifica el resultado esperado
    });
  });

  describe('update', () => {
    it('should return success message when update is successful', async () => {
      const mockGymId = 1;
      const mockUpdateDto: UpdateGymDto = {
        name: 'Updated Gym',
        phone: '+593987654321',
      };

      repositoryMock.update.mockResolvedValue({ affected: 1 } as UpdateResult);

      const result = await service.update(mockGymId, mockUpdateDto);

      expect(result).toEqual({ message: 'UPDATED', status: true });
      expect(repositoryMock.update).toHaveBeenCalledWith(
        { id: mockGymId },
        mockUpdateDto,
      );
    });

    it('should throw BadRequestException if gymId is not found', async () => {
      const mockGymId = 999; // ID inexistente
      const mockUpdateDto: UpdateGymDto = {
        name: 'Nonexistent Gym',
        phone: '+593123456789',
      };

      repositoryMock.update.mockResolvedValue({ affected: 0 } as UpdateResult);

      await expect(service.update(mockGymId, mockUpdateDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(repositoryMock.update).toHaveBeenCalledWith(
        { id: mockGymId },
        mockUpdateDto,
      );
    });

    it('should throw HttpException for unexpected errors', async () => {
      const mockGymId = 1;
      const mockUpdateDto: UpdateGymDto = {
        name: 'Test Gym',
        phone: '+593123456789',
      };

      const unexpectedError = new Error('Database connection lost');
      repositoryMock.update.mockRejectedValue(unexpectedError);

      await expect(service.update(mockGymId, mockUpdateDto)).rejects.toThrow(
        HttpException,
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        `Error in update method: gymId = ${mockGymId}, payload = ${JSON.stringify(mockUpdateDto)}`,
        expect.any(String), // Asegura que el stack trace no cause el error
      );
    });
  });
});
