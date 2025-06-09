import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin.guards';
import { TaskUtils } from './tasks.utils';
@Controller('tasks')
// @UseInterceptors(LoggerInterceptor)
@UseGuards(AuthAdminGuard)
export class TasksController {

    constructor(private readonly takService: TasksService, private readonly taskUtil: TaskUtils,
        // @Inject('KEY_TOKEN')
        // private readonly keyToken: string
    ) { }

    // PEGA EM INFORMA DE OBJETO
    // @Get('/list')
    // findAllTasks(@Query() queryParam: any) {
    //     console.log(queryParam)
    //     return this.takService.findAll();
    // }

    //PEGA UM UNICO NO QUERYPARAMS
    // @Get('/list')
    // findAllTasks(@Query('limit') limit:string) {
    //     console.log(limit)
    //     return this.takService.findAll();
    // }

    @Get('/list')
    @UseInterceptors(LoggerInterceptor)
    @UseInterceptors(AddHeaderInterceptor)
    // @UseGuards(AuthAdminGuard)
    findAllTasks(@Query() paginationDto: PaginationDto) {
        console.log(this.taskUtil.splitString('Alessandro Schuquel Pedroso'))
        // console.log(this.keyToken)
        return this.takService.findAll(paginationDto);
    }

    @Get(':id')
    findOneTask(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        return this.takService.findOne(id);
    }

    @Post()
    @UseInterceptors(BodyCreateTaskInterceptor)
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.takService.createTask(createTaskDto)
    }

    @Patch(':id')
    updateTask(@Param("id", ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        // console.log("ID: ", id)
        // console.log("Body: ", body)

        return this.takService.update(id, updateTaskDto)
    }

    @Delete(':id')
    deleteTask(@Param("id", ParseIntPipe) id: number) {
        // console.log("ID ENVIADO: " + id)
        return this.takService.delete(id)
    }

}
