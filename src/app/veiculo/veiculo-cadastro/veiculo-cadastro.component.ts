import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-veiculo-cadastro',
  templateUrl: './veiculo-cadastro.component.html',
  styleUrls: ['./veiculo-cadastro.component.css']
})
export class VeiculoCadastroComponent {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    

  }

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    anoVeiculo: new FormControl("", [Validators.required]),
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();

    this.httpClient.post(environment.apiUrl + "/Veiculo", this.formCadastro.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Veiculo ${res.nome}, cadastrado com sucesso.`;
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

