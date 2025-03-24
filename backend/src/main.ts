import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './config/configuration';

const CORS_CONFIG = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept',
};

const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('Recipe Book API')
  .setDescription(
    'API for managing and retrieving recipe information using TheMealDB.',
  )
  .setVersion('1.0.0')
  .build();

const SWAGGER_PATH = 'docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS_CONFIG);

  const configService = app.get(ConfigService);
  const { apiUrl, apiKey, port } = configService.get<AppConfig>('app') || {};

  if (!apiUrl || !apiKey || !port) {
    throw new Error('Failed to load configuration from .env or defaults');
  }

  console.log(`API Base URL: ${apiUrl}`);
  console.log(`API Key: ${apiKey}`);

  const swaggerDocument = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
  SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 7,
      persistAuthorization: false,
    },
  });

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger is available at: http://localhost:${port}/${SWAGGER_PATH}`,
  );
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
