import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

    constructor(private readonly takService: TasksService) { }

    @Get('/list')
    getTasks() {
        return this.takService.listAllTasks()
    }


    @Get('/1')
    getTest() {
        return this.takService.findOneTaks()
    }
}
