import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.useGlobalGuards(app.get(JwtAuthGuard));
  await app.listen(process.env.PORT ?? 3000);
  const logger = new Logger(AppModule.name);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
