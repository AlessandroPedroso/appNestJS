/*
    DTO > Data Transfer Object (Objeto de transferência de dados)
    > Validar dados, transformar dados.
    > Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
 */

import { IsNotEmpty, IsString, MinLength } from "class-validator";

//ESPERO QUE VOCÊ ME MANDE SOMENTE ISSO NO BODY
export class CreateTaskDto {
    @IsString({ message: "O nome precisa ser um texto" })
    @MinLength(5, { message: "O nome precisa ter 5 caracteres" })
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    readonly description: string;

}
