import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        console.log("INTERCEPTANDO ESSA REQUISIÇÃO...");

        const request = context.switchToHttp().getRequest();
        const methods = request.method;
        const url = request.url;
        const now = Date.now();

        console.log(`[REQUEST] ${methods} ${url} - Inicio da requisição: ${now} `);

        return next.handle().pipe(
            tap(() => {
                console.log(`[RESPONSE] ${methods} ${url} - Fim da requisição: ${Date.now() - now}ms `)
            })
        );
    }
}
