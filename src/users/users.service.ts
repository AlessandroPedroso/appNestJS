import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
                    Task: true
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

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {

            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!user) {
                throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST)
            }

            //Atualiza o usuário com os dados do DTO, mantendo os dados existentes se não forem fornecidos
            const updateUser = await this.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: updateUserDto.name ? updateUserDto.name : user.name,
                    passwordHash: updateUserDto.password ? updateUserDto.password : user.passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            return updateUser;

        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao atualizar usuário!', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number) {

        try {

            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!user) {
                throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST)
            }



            await this.prisma.user.delete({
                where: {
                    id: user.id
                }
            })

            return { message: 'Usuário deletado com sucesso!' };

        } catch (error) {
            throw new HttpException('Erro ao deletar usuário!', HttpStatus.BAD_REQUEST);
        }

    }

}
