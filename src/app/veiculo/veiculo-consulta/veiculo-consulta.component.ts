import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-veiculo-consulta',
  templateUrl: './veiculo-consulta.component.html',
  styleUrls: ['./veiculo-consulta.component.css']
})
export class VeiculoConsultaComponent implements OnInit {

    veiculos: any [] = [];
  
    pagina: number = 1; //paginação
    filtro: any = { nome: ''}; //filtro
  
    mensagem: string = '';
  
    constructor(
      private httpClient: HttpClient,
      private spinner: NgxSpinnerService
    ) { }
  
    ngOnInit(): void {
      
      this.spinner.show();
      
      this.httpClient.get(environment.apiUrl + "/Veiculo")
        .subscribe(
          (res) => {
            this.veiculos = res as any[];
            this.spinner.hide();
          }
        );
    }
  
    onDelete(idVeiculo: string): void {
      if (window.confirm(`Deseja realmente excluir o Veiculo selecionado:`)) {
        this.spinner.show();
  
        this.httpClient.delete(environment.apiUrl + "/Veiculo/" + idVeiculo)
          .subscribe({
            next: (res: any) => {
              this.mensagem = `Veiculo '${res.nome}' excluido com sucesso. `;
              this.ngOnInit();
              this.pagina = 1;
              this.filtro.nome = '';
              this.spinner.hide();
            },
            error: (e) => {
              console.log(e);
              this.spinner.hide();
            }
          });
      }
    }
    
    //função para realizar a paginação do componente
    handlePageChange(event: any): void {
      this.pagina = event;
    }
  
  }
  