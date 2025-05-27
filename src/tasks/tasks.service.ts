import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    listAllTasks() {
        return [{ id: 1, taks: "Comprar Pão" }]
    }

    findOneTaks() {
        return "Tarefa Alessandro Teste..."
    }

}
