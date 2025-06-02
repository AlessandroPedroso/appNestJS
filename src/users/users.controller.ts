import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// > Buscar os detalhes de 1 usuario (CHECK)
// > Cadastrar usuário (CHECK)
// > Atualizar usuário (CHEK)
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

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        // Implementar a lógica de atualização de usuário
        return this.userSerivce.update(id, updateUserDto);

    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        // Implementar a lógica de deleção de usuário
        return this.userSerivce.delete(id);

    }



}
