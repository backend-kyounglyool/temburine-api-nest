import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Temburine")
    .setDescription("템버린 API")
    .setVersion("1.0")
    .addTag("default")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "Token",
        in: "header",
      },
      "auth-user"
    )
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
