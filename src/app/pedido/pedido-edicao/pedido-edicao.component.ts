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

  clientes: any[] = [];
  veiculos: any[] = [];
  opcionals: any[] = [];
  opcionaisFiltrados: any[] = [];
  opcionaisSelecionados: any[] = [];

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
          this.opcionaisFiltrados = this.opcionals;

          this.spinner.hide();
        }
      );

    let idPedido = this.activatedRoute.snapshot.paramMap.get('idPedido') as string;

    this.spinner.show;
    this.httpClient.get(environment.apiUrl + "/Pedido/" + idPedido)
      .subscribe(
        (res: any) => {
          const veiculo = res.veiculo.idVeiculo;
          const opcionais = res.opcionais;
          this.formEdicao.patchValue(res);
          this.formEdicao.patchValue({idVeiculo: veiculo}); //pegando o veiculo.
          this.opcionaisSelecionados = opcionais; // pegando os opcionais já selecionados

          this.spinner.hide();
        }
      );

    // ouvir mudanças no campo de veiculo * filtra opcionais conforme veiculo
    this.formEdicao.get('idVeiculo')?.valueChanges.subscribe((idVeiculoSelecionado: string | null) => {
      if (idVeiculoSelecionado) {
        this.opcionaisFiltrados = this.opcionals.filter(
          (o) => o.veiculo.idVeiculo === idVeiculoSelecionado
        );
        this.formEdicao.get('idOpcional')?.setValue('');
      } else {
        this.opcionaisFiltrados = [];
        this.formEdicao.get('idOpcional')?.setValue('');
      }
      // limpa opcionais já adicionados ao trocar o veículo
      this.opcionaisSelecionados = [];
      this.formEdicao.get('idsOpcionais')?.setValue([]);


    });

    // sempre recalcula o valor do pedido
    this.atualizarValorPedido();

    this.formEdicao.get('idVeiculo')?.valueChanges.subscribe(() => this.atualizarValorPedido());
    this.formEdicao.get('idsOpcionais')?.valueChanges.subscribe(() => this.atualizarValorPedido());
    this.formEdicao.get('quantidade')?.valueChanges.subscribe(() => this.atualizarValorPedido());
  }

  formEdicao = new FormGroup({
    idPedido: new FormControl('', []),
    quantidade: new FormControl('', [Validators.required]),
    idCliente: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required]),
    idOpcional: new FormControl(''),
    idsOpcionais: new FormControl<number[]>([]),
    valor: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;

  }

  atualizarValorPedido(): void {
    const idVeiculo = this.formEdicao.get('idVeiculo')?.value;
    const OpcionaisIds = this.formEdicao.get('idsOpcionais')?.value || [];
    const quantidade = Number(this.formEdicao.get('quantidade')?.value) || 1;

    //pega o veiculo selecionado
    const veiculosSelecionado = this.veiculos.find(v => v.idVeiculo === idVeiculo);
    const precoVeiculo = veiculosSelecionado?.preco || 0;

    //soma os opcionais selecionados
    const totalOpcionais = OpcionaisIds
      .map((id: any) => this.opcionaisFiltrados.find(o => o.idOpcional == id)?.preco || 0)
      .reduce((sum: number, preco: number) => sum + preco, 0);

    const valor = (precoVeiculo + totalOpcionais) * quantidade;

    //ataualiza o campo "valor" do form
    this.formEdicao.get('valor')?.setValue(valor.toFixed(2));

  }

  addOpcional() {
    const id = this.formEdicao.get('idOpcional')?.value;
    if (!id) return;

    const opc = this.opcionaisFiltrados.find(o => o.idOpcional == id);

    // evita duplicação
    if (this.opcionaisSelecionados.some(o => o.idOpcional == id)) return;

    this.opcionaisSelecionados.push(opc);

    const ids = this.opcionaisSelecionados.map(o => o.idOpcional);
    this.formEdicao.get('idsOpcionais')?.setValue(ids);

    this.formEdicao.get('idOpcional')?.setValue(''); // limpa o select

    this.atualizarValorPedido();
  }

  removeOpcionalLocal(index: number) {
    this.opcionaisSelecionados.splice(index, 1);
    const ids = this.opcionaisSelecionados.map(o => o.idOpcional);
    this.formEdicao.get('idsOpcionais')?.setValue(ids);
    this.atualizarValorPedido();
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.hide();

    console.log("payload: ", this.formEdicao.value);

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
