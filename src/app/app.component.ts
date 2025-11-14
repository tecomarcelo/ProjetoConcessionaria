import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from './helpers/authentication.helper';

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
  ) { }


  ngOnInit(): void {
    // Observa mudanças no estado de autenticação
    this.authenticationHelper.authState$.subscribe(data => {
      if (data) {
        this.isLoggedIn = true;
        this.usuario = data.name;
      } else {
        this.isLoggedIn = false;
        this.usuario = '';
      }
    });
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
