import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly usersService: UsersService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const user = await this.usersService.findByRun(createGameDto.run);

    const game = this.gameRepository.create({
      errors: createGameDto.errors,
      successes: createGameDto.successes,
      totalMoves: createGameDto.totalMoves,
      timeSeconds: createGameDto.timeSeconds,
      userId: user.id,
    });

    return this.gameRepository.save(game);
  }

  async findByRun(run: string): Promise<Game[]> {
    const user = await this.usersService.findByRun(run);

    return this.gameRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }
}
