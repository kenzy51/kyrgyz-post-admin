import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Swagger application for backend")
    .setDescription("RESTApi documentation")
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token', 
    )
    .build()
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api", app, document);
  app.enableCors();
  await app.listen(PORT, () => console.log(`server started 0n ${PORT}`));
}
start();
