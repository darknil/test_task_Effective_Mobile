import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  async updateHasProblemsFlag(): Promise<number> {
    const start = performance.now();

    const countBefore = await this.userRepository.count({
      where: { hasProblems: true },
    });

    const chunkSize = 1000;
    const totalCount = await this.userRepository.count();
    const batchCount = Math.ceil(totalCount / chunkSize);

    for (let i = 0; i < batchCount; i++) {
      const usersChunk = await this.userRepository.find({
        where: { hasProblems: true },
        skip: i * chunkSize,
        take: chunkSize,
      });

      await this.userRepository.update(
        { id: In(usersChunk.map((user) => user.id)) },
        { hasProblems: false },
      );
    }

    const end = performance.now();
    const duration = (end - start).toFixed(2);
    console.log(`updateHasProblemsFlag took ${duration}ms`);

    return countBefore;
  }
}
