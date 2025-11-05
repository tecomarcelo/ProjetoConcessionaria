import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-opcional-edicao',
  templateUrl: './opcional-edicao.component.html',
  styleUrls: ['./opcional-edicao.component.css']
})
export class OpcionalEdicaoComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
    this.spinner.show();

    let idOpcional = this.activatedRoute.snapshot.paramMap.get('idOpcional') as string;
    
    this.httpClient.get(environment.apiUrl + "/Opcional/" + idOpcional) 
      .subscribe(
        (res) => {
          this.formEdicao.patchValue(res);
          this.spinner.hide();
        }
      )
  }

  formEdicao = new FormGroup({
    idOpcional: new FormControl('', []),
    item: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.hide();

    this.httpClient.put(environment.apiUrl + "/Opcional", this.formEdicao.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Opcional ${res.item}, atualizado com sucesso.`;
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
