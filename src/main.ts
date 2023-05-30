import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    //origin 부분에 특정 url 을 적어주면
    origin: true,
    credentials: true,
  });
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
