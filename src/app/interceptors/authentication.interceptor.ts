import { Injectable } from "@angular/core";
import { AuthenticationHelper } from "../Helpers/authentication.helper";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private authenticationHelper: AuthenticationHelper
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('api/Veiculo') || req.url.includes('api/Opcional') || req.url.includes('api/Pedido') || req.url.includes('api/Cliente')) {

            let accessToken = this.authenticationHelper.getAuthData().accessToken;
            console.log('## Accesstoken: ', accessToken);

            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }
        
        console.log('## url token: ', req);

        return next.handle(req);
    }
}