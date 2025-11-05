import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-consulta',
  templateUrl: './pedido-consulta.component.html',
  styleUrls: ['./pedido-consulta.component.css']
})
export class PedidoConsultaComponent implements OnInit {

  pedidos: any [] = [];

  pagina: number = 1; //paginação
  filtro: any = { idPedido: ''}; //filtro

  mensagem: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }
  
  ngOnInit(): void {
    
    this.spinner.show();
    
    this.httpClient.get(environment.apiUrl + "/Pedido")
      .subscribe(
        (res) => {
          this.pedidos = res as any[];
          console.log('##Pedidos: ', this.pedidos);
          this.spinner.hide();
        }        
      );
      
  }

  onDelete(idPedido: string): void {
    if (window.confirm(`Deseja realmente excluir o Pedido selecionado:`)) {
      this.spinner.show();

      this.httpClient.delete(environment.apiUrl + "/Pedido/" + idPedido)
        .subscribe({
          next: (res: any) => {
            this.mensagem = `Pedido '${res.nome}' excluido com sucesso. `;
            this.ngOnInit();
            this.pagina = 1;
            this.filtro.idPedido = '';
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
