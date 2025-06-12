import { Injectable, Body, HttpException, HttpStatus, NotFoundException, Delete } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { PrismaService } from '../prisma/prisma.service'
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

@Injectable()
export class TasksService {

    constructor(private prisma: PrismaService) { }

    // private tasks: Task[] = [
    //     {
    //         id: 1,
    //         name: "Alessandro",
    //         description: "Evoluindo com o nest",
    //         completed: false
    //     }
    // ]

    async findAll(paginationDto: PaginationDto) {

        const { limit = 10, offset = 0 } = paginationDto;


        const allTasks = await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return allTasks
    }

    async findOne(id: number) {

        const task = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })

        if (task?.name) return task;

        // throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND)
        throw new HttpException("", HttpStatus.NOT_FOUND)




        // const task = this.tasks.find(task => task.id === id);
        // // const task = this.tasks.find(task => task.id === Number(id)); // sem usar o transformer do pipes

        // if (task) {
        //     return task;
        // }

        // throw new HttpException("Essa tarefa não existe", HttpStatus.NOT_FOUND)
        // // throw new NotFoundException("Essa tarefa não existe!")


    }

    async createTask(createTaskDto: CreateTaskDto, tokenPayLoad: PayloadTokenDto) {

        try {

            const newTask = await this.prisma.task.create({
                data: {
                    name: createTaskDto.name,
                    description: createTaskDto.description,
                    completed: false,
                    userId: tokenPayLoad.sub
                }
            })

            return newTask;

        } catch (error) {
            console.log(error)
            throw new HttpException("Falha ao criar essa tarefa", HttpStatus.BAD_REQUEST)
        }



        // const newId = this.tasks.length + 1;

        // const newTask = {
        //     id: newId,
        //     ...createTaskDto,
        //     completed: false
        // }

        // this.tasks.push(newTask)

        // console.log("TAREFA CRIADO COM SUCESSO!")
        // return newTask
    }

    async update(id: number, updateTaskDto: UpdateTaskDto, tokenPayLoad: PayloadTokenDto) {

        try {

            const findTask = await this.prisma.task.findFirst({
                where: {
                    id: id
                }
            })

            if (!findTask) {
                throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
            }

            if (findTask.userId !== tokenPayLoad.sub) {
                throw new HttpException("Essa tarefa não pertence ao usuário", HttpStatus.BAD_REQUEST)
            }



            const task = await this.prisma.task.update({
                where: {
                    id: findTask.id
                },
                data: {
                    name: updateTaskDto?.name ? updateTaskDto?.name : findTask.name,
                    description: updateTaskDto?.description ? updateTaskDto?.description : findTask.description,
                    completed: updateTaskDto?.completed ? updateTaskDto?.completed : findTask.completed,
                }
            })

            return task;

        } catch (error) {

            throw new HttpException("Falha ao atualizar essa tarefa", HttpStatus.BAD_REQUEST)

        }


        // const taskIndex = this.tasks.findIndex(task => task.id === id)

        // if (taskIndex < 0) {

        //     throw new HttpException("Essa tarefa não existe", HttpStatus.NOT_FOUND)

        // }


        // const taskItem = this.tasks[taskIndex]

        // this.tasks[taskIndex] = {
        //     ...taskItem,
        //     ...updateTaskDto
        // }


        // return this.tasks[taskIndex]

    }

    async delete(id: number, tokenPayLoad: PayloadTokenDto) {

        try {

            const findTask = await this.prisma.task.findFirst({
                where: {
                    id: id
                }
            })

            if (!findTask) {
                throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
            }

            if (findTask.userId !== tokenPayLoad.sub) {
                throw new HttpException("Falha ao deletar essa tarefa", HttpStatus.NOT_FOUND)

            }

            await this.prisma.task.delete({
                where: {
                    id: findTask.id
                }
            })

            return { message: "Tarefa Excluida com sucesso" }

        } catch (error) {
            throw new HttpException("Falha ao deletar essa tarefa", HttpStatus.BAD_REQUEST)
            console.log(error)
        }

        // const taskIndex = this.tasks.findIndex(task => task.id === id)

        // if (taskIndex < 0) {
        //     throw new HttpException("Essa tarefa não existe", HttpStatus.NOT_FOUND)
        // }

        // this.tasks.splice(taskIndex, 1);

        // return { message: "Tarefa Excluida com sucesso" }

    }

}
