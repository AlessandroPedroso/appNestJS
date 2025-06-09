import { Global, Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';


@Global() // Módulo global - Pode ser usado na aplicação inteira (Não precisa importar em outros módulos para usar)
@Module({
    providers: [
        {
            provide: HashingServiceProtocol,
            useClass: BcryptService
        }
    ],
    exports: [
        HashingServiceProtocol
    ]
})
export class AuthModule {
}
