import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module'; // Убедитесь, что путь к AppModule правильный
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seedService = app.get(SeedService);

  await seedService.truncateDatabase();

  console.log('Database has been cleared!');
  await app.close();
}

bootstrap();
