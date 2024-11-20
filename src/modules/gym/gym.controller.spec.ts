import { Test, TestingModule } from '@nestjs/testing';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

describe('GymController', () => {
  let controller: GymController;
  let service: GymService;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GymController],
      providers: [
        {
          provide: GymService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GymController>(GymController) as GymController;
    service = module.get<GymService>(GymService) as GymService;

    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call GymService.create with correct data and return result', async () => {
    const dto: CreateGymDto = {
      name: 'Test',
      phone: '+593999999999',
      email: 'test@mail.com',
    };
    const mockedResult = { message: 'CREATED', status: true };
    const spy = jest.spyOn(service, 'create').mockResolvedValue(mockedResult);

    const result = await controller.create(dto);

    expect(spy).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockedResult);
  });

  it('should accept a valid CreateGymDto', async () => {
    const dto = {
      name: 'Valid Gym',
      phone: '+593999999999',
      email: 'gym@example.com',
    };

    const transformedDto = plainToInstance(CreateGymDto, dto);

    const result = await validationPipe.transform(transformedDto, {
      type: 'body',
      metatype: CreateGymDto,
    });

    expect(result).toEqual(dto);
  });

  it('should throw an error if name is missing', async () => {
    const dto = {
      phone: '+5934567890',
      email: 'gym@example.com',
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('should throw an error if name is too short', async () => {
    const dto = {
      name: 'A', // Longitud = 1
      phone: '+1234567890',
      email: 'gym@example.com',
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('should throw an error if name is too long', async () => {
    const dto = {
      name: 'A'.repeat(101), // Longitud = 101
      phone: '+1234567890',
      email: 'gym@example.com',
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('should throw an error if phone is not a valid phone number', async () => {
    const dto = {
      name: 'Valid Gym',
      phone: '123abc', // Formato incorrecto
      email: 'gym@example.com',
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('should throw an error if phone is too short', async () => {
    const dto = {
      name: 'Valid Gym',
      phone: '+593', // Longitud = 4
      email: 'gym@example.com',
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('should throw an error if phone is too long', async () => {
    const dto = {
      name: 'Valid Gym',
      phone: '+59322456789012345678901', // Longitud = 21
      email: 'gym@example.com',
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });

  it('should accept a valid DTO without email', async () => {
    const dto = {
      name: 'Valid Gym',
      phone: '+59322309207',
    };

    const result = await validationPipe.transform(dto, {
      type: 'body',
      metatype: CreateGymDto,
    });

    expect(result).toEqual(dto); // El DTO debe pasar sin errores
  });

  it('should throw an error if email is too long', async () => {
    const dto = {
      name: 'Valid Gym',
      phone: '+5934567890',
      email: 'a'.repeat(101), // Longitud = 101
    };

    await expect(
      validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateGymDto,
      }),
    ).rejects.toThrowError('Bad Request Exception');
  });
});
