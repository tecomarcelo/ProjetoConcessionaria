import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cliente-edicao',
  templateUrl: './cliente-edicao.component.html',
  styleUrls: ['./cliente-edicao.component.css']
})
export class ClienteEdicaoComponent implements OnInit{

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
    this.spinner.show();

    let idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente') as string;
    
    this.httpClient.get(environment.apiUrl + "/Cliente/" + idCliente) 
      .subscribe(
        (res) => {
          this.formEdicao.patchValue(res);
          this.spinner.hide();
        }
      );
  }

  formEdicao = new FormGroup({
    idCliente: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.hide();

    this.httpClient.put(environment.apiUrl + "/Cliente", this.formEdicao.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Cliente ${res.nome}, atualizado com sucesso.`;
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
