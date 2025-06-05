import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("[MIDDLEWARE] Passando...");

        const authorization = req.headers.authorization;

        if (authorization) {
            req['user'] = {
                token: authorization,
                name: "FULANO TESTE"
            }
        }

        // if (authorization) {
        //     if (authorization === '123456') {
        //         console.log("Token: ", authorization)
        //         return next();
        //     }

        //     res.status(401).json({ message: "Token inválido!" });

        // }

        next();
    }
}