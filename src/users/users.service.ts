import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findOne(id: number) {

        try {

            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            })

            if (user) {
                return user
            }

            throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST)


        } catch (error) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST)
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        try {

            const user = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    passwordHash: createUserDto.password
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            })

            return user;
        } catch (error) {

            throw new HttpException('Erro ao criar usuário!', HttpStatus.BAD_REQUEST);
        }
    }
}
