import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class AuthenticationHelper {
    //método para gravar os dados do usuário autenticado na local storage do navegador 
    signIn(dados: any): void {
        //salvando na localstorage 
        localStorage.setItem('AUTH_USUARIO', JSON.stringify(dados));
    }

    //método para ler os dados gravados na localstorage 
    getAuthData(): any {
        let dados = localStorage.getItem('AUTH_USUARIO'); 
        if (dados != null) 
            return JSON.parse(dados) as any 
        else
            return null; 
    }

    // método para apagar o conteúdo da localstorage 
    signOut(): void {
        //deletando os dados gravados na localstorage 
        localStorage.removeItem('AUTH_USUARIO');
    }
}