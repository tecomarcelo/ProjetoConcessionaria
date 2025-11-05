import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pedido-edicao',
  templateUrl: './pedido-edicao.component.html',
  styleUrls: ['./pedido-edicao.component.css']
})
export class PedidoEdicaoComponent implements OnInit {

  clientes: any [] = [];
  veiculos: any [] = [];
  opcionals: any [] = [];
  
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
    this.spinner.show();
    this.httpClient.get(environment.apiUrl + "/Cliente") 
      .subscribe(
        (res) => {
          this.clientes = res as any[];
          this.spinner.hide();
        }
      );
      this.httpClient.get(environment.apiUrl + "/Veiculo") 
      .subscribe(
        (res) => {
          this.veiculos = res as any[];
          this.spinner.hide();
        }
      );
      this.httpClient.get(environment.apiUrl + "/Opcional") 
      .subscribe(
        (res) => {
          this.opcionals = res as any[];
          this.spinner.hide();
        }
      );

    let idPedido = this.activatedRoute.snapshot.paramMap.get('idPedido') as string;

    this.spinner.show;
    this.httpClient.get(environment.apiUrl + "/Pedido/" + idPedido) 
      .subscribe(
        (res: any) => {
          this.formEdicao.patchValue(res);
          this.spinner.hide();
        }
      );
  }

  formEdicao = new FormGroup({
    idPedido: new FormControl('', []),
    valor: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    idCliente: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required]),
    idOpcional: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;

  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.hide();

    this.httpClient.put(environment.apiUrl + "/Pedido", this.formEdicao.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Pedido ${res.idPedido}, atualizado com sucesso.`;
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
