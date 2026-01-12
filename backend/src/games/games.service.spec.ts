import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { UsersService } from '../users/users.service';
import { CreateGameDto } from './dto/create-game.dto';
import { User } from '../users/entities/user.entity';

describe('GamesService', () => {
  let service: GamesService;
  let gameRepository: Repository<Game>;
  let usersService: UsersService;

  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    run: '12345678-9',
    createdAt: new Date(),
    games: [],
  };

  const mockGame: Game = {
    id: '223e4567-e89b-12d3-a456-426614174000',
    errors: 5,
    successes: 8,
    totalMoves: 13,
    timeSeconds: 120,
    createdAt: new Date(),
    user: mockUser,
    userId: mockUser.id,
  };

  const mockGameRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUsersService = {
    findByRun: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockGameRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createGameDto: CreateGameDto = {
      run: '12345678-9',
      errors: 5,
      successes: 8,
      totalMoves: 13,
      timeSeconds: 120,
    };

    it('should create a new game', async () => {
      mockUsersService.findByRun.mockResolvedValue(mockUser);
      mockGameRepository.create.mockReturnValue(mockGame);
      mockGameRepository.save.mockResolvedValue(mockGame);

      const result = await service.create(createGameDto);

      expect(result).toEqual(mockGame);
      expect(mockUsersService.findByRun).toHaveBeenCalledWith('12345678-9');
      expect(mockGameRepository.create).toHaveBeenCalledWith({
        errors: 5,
        successes: 8,
        totalMoves: 13,
        timeSeconds: 120,
        userId: mockUser.id,
      });
      expect(mockGameRepository.save).toHaveBeenCalled();
    });

    it('should throw error if user not found', async () => {
      mockUsersService.findByRun.mockRejectedValue(new NotFoundException());

      await expect(service.create(createGameDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByRun', () => {
    it('should return games for a specific RUN', async () => {
      const games = [mockGame];
      mockUsersService.findByRun.mockResolvedValue(mockUser);
      mockGameRepository.find.mockResolvedValue(games);

      const result = await service.findByRun('12345678-9');

      expect(result).toEqual(games);
      expect(mockGameRepository.find).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        order: { createdAt: 'DESC' },
        relations: ['user'],
      });
    });
  });

  describe('findAll', () => {
    it('should return all games', async () => {
      const games = [mockGame];
      mockGameRepository.find.mockResolvedValue(games);

      const result = await service.findAll();

      expect(result).toEqual(games);
      expect(mockGameRepository.find).toHaveBeenCalledWith({
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single game by ID', async () => {
      mockGameRepository.findOne.mockResolvedValue(mockGame);

      const result = await service.findOne('223e4567-e89b-12d3-a456-426614174000');

      expect(result).toEqual(mockGame);
      expect(mockGameRepository.findOne).toHaveBeenCalledWith({
        where: { id: '223e4567-e89b-12d3-a456-426614174000' },
        relations: ['user'],
      });
    });

    it('should throw NotFoundException if game not found', async () => {
      mockGameRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });
});
