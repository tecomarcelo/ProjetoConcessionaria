import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
  ) { }


  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();

    this.httpClient.post(environment.apiUrl + "/Cliente", this.formCadastro.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Cliente ${res.nome}, cadastrado com sucesso.`;
            this.formCadastro.reset();
            this.spinner.hide();
          },
          error: (e) => {
            switch (e.status) {
              case 422:
                this.mensagem_erro = e.error.message;
                break;
              default:
                this.mensagem_erro = "Ocorreu um erro.";
                break;
            }
            this.spinner.hide();
          }
        }
      )
  }

  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

}

