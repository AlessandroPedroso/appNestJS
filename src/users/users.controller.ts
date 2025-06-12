import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/auth.constants';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

// > Buscar os detalhes de 1 usuario (CHECK)
// > Cadastrar usuário (CHECK)
// > Atualizar usuário (CHEK)
// > Deletar usuário

@Controller('users')
export class UsersController {

    constructor(private readonly userSerivce: UsersService) { }

    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {
        console.log('Token teste: ', process.env.TOKEN_KEY)
        return this.userSerivce.findOne(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        // Implementar a lógica de criação de usuário
        console.log(createUserDto);
        return this.userSerivce.createUser(createUserDto);
    }

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @Req() req: Request, @TokenPayloadParam() tokenPayload: PayloadTokenDto) {
        // Implementar a lógica de atualização de usuário

        // console.log(req[REQUEST_TOKEN_PAYLOAD_NAME])
        // console.log('ID user: ', req[REQUEST_TOKEN_PAYLOAD_NAME].sub)

        console.log("PATLOAD RECEBIDO: ", tokenPayload)

        return this.userSerivce.update(id, updateUserDto, tokenPayload);

    }

    @UseGuards(AuthTokenGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number, @TokenPayloadParam() tokenPayload: PayloadTokenDto) {
        // Implementar a lógica de deleção de usuário
        return this.userSerivce.delete(id, tokenPayload);

    }



}
