
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

// 1 - Verificar se o email/usuario existe
// 2 - Verificar se a senha está correta

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly hashingService: HashingServiceProtocol,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ) {
        // console.log(jwtConfiguration) //testa no console.log quando for redenrizado
     }

    async authenticate(signinDto: SignInDto) {
        // console.log(signinDto);

        //verificar se o e-mail existe
        const user = await this.prisma.user.findFirst({
            where: {
                email: signinDto.email
            }
        })

        if (!user) {
            throw new HttpException("Falha ao fazer o login", HttpStatus.UNAUTHORIZED)
        }

        //validar a senha
        const passwordIsValid = await this.hashingService.compare(signinDto.password, user.passwordHash);

        if (!passwordIsValid) {

            throw new HttpException("Senha/Usuário incorreta", HttpStatus.UNAUTHORIZED)

        }

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}
