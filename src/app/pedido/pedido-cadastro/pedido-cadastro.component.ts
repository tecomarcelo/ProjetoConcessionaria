import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.component.html',
  styleUrls: ['./pedido-cadastro.component.css']
})
export class PedidoCadastroComponent implements OnInit {

  clientes: any [] = [];
  veiculos: any [] = [];
  opcionals: any [] = [];
  opcionaisFiltrados: any[] = [];
  opcionaisSelecionados: any[] = [];

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
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
        console.log('opcionais: ', this.opcionals);
        this.spinner.hide();
      }
    );
    
    // ouvir mudanças no campo de veiculo * filtra opcionais conforme veiculo
    this.formCadastro.get('idVeiculo')?.valueChanges.subscribe((idVeiculoSelecionado: string | null) => {
      if (idVeiculoSelecionado) {
        this.opcionaisFiltrados = this.opcionals.filter(
          (o) => o.veiculo.idVeiculo === idVeiculoSelecionado
        );
        this.formCadastro.get('idOpcional')?.setValue('');
      } else {
        this.opcionaisFiltrados = [];
        this.formCadastro.get('idOpcional')?.setValue('');
      }
      // limpa opcionais já adicionados ao trocar o veículo
      this.opcionaisSelecionados = [];
      this.formCadastro.get('idsOpcionais')?.setValue([]);


    });

    // sempre recalcula o valor do pedido
    this.atualizarValorPedido();

    this.formCadastro.get('idVeiculo')?.valueChanges.subscribe(() => this.atualizarValorPedido());
    this.formCadastro.get('idsOpcionais')?.valueChanges.subscribe(() => this.atualizarValorPedido());
    this.formCadastro.get('quantidade')?.valueChanges.subscribe(() => this.atualizarValorPedido());
  }

  formCadastro = new FormGroup({
    quantidade: new FormControl('', [Validators.required]),
    idCliente: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required]),
    idOpcional: new FormControl(''),
    idsOpcionais: new FormControl<number[]>([]),
    valor: new FormControl('', [Validators.required])
    
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  atualizarValorPedido(): void {
    const idVeiculo = this.formCadastro.get('idVeiculo')?.value;
    const OpcionaisIds = this.formCadastro.get('idsOpcionais')?.value || [];
    const quantidade = Number(this.formCadastro.get('quantidade')?.value) || 1;

    //pega o veiculo selecionado
    const veiculosSelecionado = this.veiculos.find(v => v.idVeiculo === idVeiculo);
    const precoVeiculo = veiculosSelecionado?.preco || 0;

    //soma os opcionais selecionados
    const totalOpcionais = OpcionaisIds
      .map((id: any) => this.opcionaisFiltrados.find(o => o.idOpcional == id)?.preco || 0)
      .reduce((sum: number, preco: number) => sum + preco, 0);

    const valor = (precoVeiculo + totalOpcionais) * quantidade;

    //ataualiza o campo "valor" do form
    this.formCadastro.get('valor')?.setValue(valor.toFixed(2));
    
  }

  addOpcional() {
    const id = this.formCadastro.get('idOpcional')?.value;
    if (!id) return;

    const opc = this.opcionaisFiltrados.find(o => o.idOpcional == id);
    
    // evita duplicação
    if (this.opcionaisSelecionados.some(o => o.idOpcional == id)) return;

    this.opcionaisSelecionados.push(opc);

    const ids = this.opcionaisSelecionados.map(o => o.idOpcional);
    this.formCadastro.get('idsOpcionais')?.setValue(ids);

    this.formCadastro.get('idOpcional')?.setValue(''); // limpa o select

    this.atualizarValorPedido();
  }

  removeOpcionalLocal(index: number) {
    this.opcionaisSelecionados.splice(index, 1);
    const ids = this.opcionaisSelecionados.map(o => o.idOpcional);
    this.formCadastro.get('idsOpcionais')?.setValue(ids);
    this.atualizarValorPedido();
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();
    console.log("PayloadAPI:", this.formCadastro.value);
    this.httpClient.post(environment.apiUrl + "/Pedido", this.formCadastro.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Pedido ${res.idPedido}, cadastrado com sucesso.`;
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

