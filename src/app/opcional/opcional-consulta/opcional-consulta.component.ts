import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-opcional-consulta',
  templateUrl: './opcional-consulta.component.html',
  styleUrls: ['./opcional-consulta.component.css']
})
export class OpcionalConsultaComponent {

  opcionals: any [] = [];

  pagina: number = 1; //paginação
  filtro: any = { item: ''}; //filtro

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    
    this.spinner.show();
    
    this.httpClient.get(environment.apiUrl + "/Opcional")
      .subscribe(
        (res) => {
          this.opcionals = res as any[];
          this.spinner.hide();
        }
      );
  }

  onDelete(idOpcional: string): void {
    if (window.confirm(`Deseja realmente excluir o Opcional selecionado:`)) {
      this.spinner.show();

      this.httpClient.delete(environment.apiUrl + "/Opcional/" + idOpcional)
        .subscribe({
          next: (res: any) => {
            this.mensagem = `Opcional '${res.item}' excluido com sucesso. `;
            this.ngOnInit();
            this.pagina = 1;
            this.filtro.item = '';
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
