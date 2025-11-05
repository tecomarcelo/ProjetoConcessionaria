import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-opcional-cadastro',
  templateUrl: './opcional-cadastro.component.html',
  styleUrls: ['./opcional-cadastro.component.css']
})
export class OpcionalCadastroComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  veiculos: any [] = [];

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
  ) { }


  formCadastro = new FormGroup({
    item: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + "/Veiculo")
    .subscribe(
      (res) => {
        this.veiculos = res as any[];
        this.spinner.hide();
      }
    );
    
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();

    this.httpClient.post(environment.apiUrl + "/Opcional", this.formCadastro.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Opcional ${res.item}, cadastrado com sucesso.`;
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

