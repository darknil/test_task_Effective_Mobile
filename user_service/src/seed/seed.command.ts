import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
@Command({
  name: 'seed:users',
  description: 'Seed users into the database',
})
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedService: SeedService) {
    super();
  }

  @Option({
    flags: '-c, --count <count>',
    description: 'Number of users to seed',
    defaultValue: 1000,
  })
  parseCount(val: string): number {
    return parseInt(val, 10);
  }

  async run(passedParam: string[]): Promise<void> {
    const count = this.parseCount(passedParam[0]);
    console.log(`Seeding ${count} users...`);
    await this.seedService.seedUsers(count);
    console.log('Seeding complete!');
  }
}
