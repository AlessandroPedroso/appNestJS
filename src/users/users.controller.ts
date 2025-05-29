import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

// > Buscar os detalhes de 1 usuario (CHECK)
// > Cadastrar usuário (CHECK)
// > Atualizar usuário
// > Deletar usuário

@Controller('users')
export class UsersController {

    constructor(private readonly userSerivce: UsersService) { }

    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {

        return this.userSerivce.findOne(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        // Implementar a lógica de criação de usuário
        console.log(createUserDto);
        return this.userSerivce.createUser(createUserDto);
    }



}
