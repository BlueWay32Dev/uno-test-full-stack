import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { run: createUserDto.run.toUpperCase() },
    });

    if (existingUser) {
      throw new ConflictException('RUN already exists');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      run: createUserDto.run.toUpperCase(),
    });

    return this.userRepository.save(user);
  }

  async findByRun(run: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { run: run.toUpperCase() },
      relations: ['games'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['games'] });
  }
}
