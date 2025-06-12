
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

// 1 - Verificar se o email/usuario existe
// 2 - Verificar se a senha está correta

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly hashingService: HashingServiceProtocol,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService
    ) {
        //console.log(jwtConfiguration) //testa no console.log quando for redenrizado
    }

    async authenticate(signinDto: SignInDto) {
        // console.log(signinDto);

        //verificar se o e-mail existe
        const user = await this.prisma.user.findFirst({
            where: {
                email: signinDto.email,
                active: true
            }
        })

        if (!user) {
            throw new HttpException("Falha ao autenticar o usuário", HttpStatus.UNAUTHORIZED)
        }

        //validar a senha
        const passwordIsValid = await this.hashingService.compare(signinDto.password, user.passwordHash);

        if (!passwordIsValid) {

            throw new HttpException("Senha/Usuário incorreta", HttpStatus.UNAUTHORIZED)

        }

        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
                name: user.name
            },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}
