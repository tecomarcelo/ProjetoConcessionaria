import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-veiculo-edicao',
  templateUrl: './veiculo-edicao.component.html',
  styleUrls: ['./veiculo-edicao.component.css']
})
export class VeiculoEdicaoComponent implements OnInit {
  
    mensagem_sucesso: string = '';
    mensagem_erro: string = '';
    
    constructor(
      private activatedRoute: ActivatedRoute,
      private httpClient: HttpClient,
      private spinner: NgxSpinnerService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
       
      let idVeiculo = this.activatedRoute.snapshot.paramMap.get('idVeiculo') as string;
  
      this.spinner.show;
      this.httpClient.get(environment.apiUrl + "/Veiculo/" + idVeiculo) 
        .subscribe(
          (res: any) => {
            const anoFormatado = res.anoVeiculo.toString().slice(0, 4) + ' - ' + res.anoVeiculo.toString().slice(4);
            this.formEdicao.patchValue(res);
            this.formEdicao.patchValue({anoVeiculo: anoFormatado});

            this.spinner.hide();
          }
        );
    }
  
    formEdicao = new FormGroup({
      idVeiculo: new FormControl('', []),
      nome: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      anoVeiculo: new FormControl('', [Validators.required]),
    });
  
    get form(): any {
      return this.formEdicao.controls;
  
    }
  
    onSubmit(): void {
  
      this.limparMensagens();
      this.spinner.hide();

      // re-ajusta o formato do anoVeiculo
      const anoLimpo = this.formEdicao.value.anoVeiculo?.replace(/\D/g, '');
      this.formEdicao.patchValue({anoVeiculo: anoLimpo});
  
      this.httpClient.put(environment.apiUrl + "/Veiculo", this.formEdicao.value)
        .subscribe(
          {
            next: (res: any) => {
              this.mensagem_sucesso = `Veiculo ${res.nome}, atualizado com sucesso.`;
              this.spinner.hide();

              // Aguarda 2 segundos e redireciona
              setTimeout(() => {
                this.router.navigate(['/veiculo-consulta']);
              }, 1000);


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
  