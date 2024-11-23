import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(count: number): Promise<void> {
    const users = [];
    for (let i = 0; i < count; i++) {
      const hasProblems = Math.random() < 0.5;
      users.push(
        this.userRepository.create({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          age: faker.number.int({ min: 18, max: 80 }),
          gender: faker.helpers.arrayElement(['male', 'female']),
          hasProblems,
        }),
      );
    }

    console.log(`Seeding ${count} users...`);
    await this.userRepository.save(users, { chunk: 1000 });
    console.log('Seeding complete.');
  }
  async clearUsers(): Promise<void> {
    await this.userRepository.clear();
    console.log('Users table has been cleared.');
  }
  async truncateDatabase(): Promise<void> {
    await this.userRepository.query(
      'TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;',
    );
    console.log('Database has been truncated.');
  }
}
