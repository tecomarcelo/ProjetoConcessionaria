import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-consulta',
  templateUrl: './login-consulta.component.html',
  styleUrls: ['./login-consulta.component.css']
})
export class LoginConsultaComponent {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  formLogin = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit(): void {
    this.spinner.show();

    this.httpClient.post(environment.apiUrlAuth + "/users/auth", this.formLogin.value)    
      .subscribe({
      next: (res: any) => {
        this.mensagem_sucesso = `Login efetuado com sucesso!`;
        
        const accessToken = res.accessToken; 
        localStorage.setItem('accessToken', accessToken);
        
        this.formLogin.reset();
        this.spinner.hide();
        // Aguarda 2 segundos e redireciona
        setTimeout(() => {
          this.router.navigate(['/pedido-cadastro']);
          this.router.navigate
        }, 1000);
      },
      error: (e) => {
        switch (e.status) {
          case 401:
            this.mensagem_erro = `Usuário não encontrado. Verifique os dados informados.`;
            console.log(e.error.message);
            break;
          default:
            console.log(e.error.message);
            break;
        }
        this.spinner.hide();
      }
    })    
  }

  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

}
