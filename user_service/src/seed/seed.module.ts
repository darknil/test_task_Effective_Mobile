import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../user/user.entity';
import { SeedCommand } from './seed.command';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SeedService, SeedCommand],
  exports: [SeedService],
})
export class SeedModule {}
