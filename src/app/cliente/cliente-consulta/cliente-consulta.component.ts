import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {

  clientes: any [] = [];

  pagina: number = 1; //paginação
  filtro: any = { nome: ''}; //filtro

  mensagem: string = '';

  constructor(
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
  }

  onDelete(idCliente: string): void {
    if (window.confirm(`Deseja realmente excluir o cliente selecionado:`)) {
      this.spinner.show();

      this.httpClient.delete(environment.apiUrl + "/Cliente/" + idCliente)
        .subscribe({
          next: (res: any) => {
            this.mensagem = `Cliente '${res.nome}' excluida com sucesso. `;
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
