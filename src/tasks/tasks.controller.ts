import { Controller, Get, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

    constructor(private readonly takService: TasksService) { }

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
    findAllTasks() {

        return this.takService.findAll();
    }


    @Get(':id')
    findOneTask(@Param('id') id:string) {
        console.log(id);
        return this.takService.findOne(id);
    }
}
