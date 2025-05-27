import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/*

- `src/app.module.ts`: Módulo principal do aplicativo.
- `src/app.controller.ts`: Define as rotas e lida com as requisições.
- `src/app.service.ts`: Contém a lógica de negócio, separado do controlador.

*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
