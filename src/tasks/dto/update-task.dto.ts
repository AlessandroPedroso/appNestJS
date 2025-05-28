
/*
    DTO > Data Transfer Object (Objeto de transferência de dados)
    > Validar dados, transformar dados.
    > Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
 */

import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from '../dto/create-task.dto'

import { IsBoolean, IsOptional, IsString } from "class-validator";

// //ESPERO QUE VOCÊ ME MANDE SOMENTE ISSO NO BODY
// export class UpdateTaskDto {
//     @IsString()
//     @IsOptional()
//     readonly name?: string;
//     @IsString()
//     @IsOptional()
//     readonly description?: string;
//     @IsBoolean()
//     @IsOptional()
//     readonly completed?: boolean;
// }

// PEGA OS DADOS PARCIALMENTE, COM ISSO NÃO PRECISA REPETIR AS MESMAS PROPRIEADES MAS DEIXA OPCIONAL
export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean;
}