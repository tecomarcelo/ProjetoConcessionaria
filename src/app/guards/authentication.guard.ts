import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthenticationHelper } from "../helpers/authentication.helper";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {
    constructor(
        private authenticationHelper: AuthenticationHelper
    ) { }

    canActivate() {
        //verificar se o usuário está autenticado 
        if (this.authenticationHelper.getAuthData()) {
            return true;
        }
        else {
            window.location.href = '/';
            return false;
        }
    }
}