import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from './Helpers/authentication.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: boolean = false; 
  usuario: string = '';

  constructor(
    private authenticationHelper: AuthenticationHelper,
    private spinner: NgxSpinnerService
  ) {

    //verificar se o usuário está autenticado 
    if (authenticationHelper.getAuthData()) {
      this.isLoggedIn = true; 
      this.usuario = authenticationHelper.getAuthData().name;
    } 
  } 
  
  //método para fazer o logout do usuário 
  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      this.spinner.show(); 
      this.authenticationHelper.signOut();
      
      window.location.href = '/';
    }
  }  
}
