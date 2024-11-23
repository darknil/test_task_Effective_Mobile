import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from '../seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  const count = process.argv[2] || '10';
  await seedService.seedUsers(parseInt(count, 10));

  await app.close();
}
bootstrap();
