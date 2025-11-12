import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//importando os componentes que serão mapeados
import { LoginConsultaComponent } from "./login/login-consulta/login-consulta.component";
import { UsuarioCadastroComponent } from "./login/usuario-cadastro/usuario-cadastro.component";
import { ClienteCadastroComponent } from "./cliente/cliente-cadastro/cliente-cadastro.component";
import { ClienteConsultaComponent } from "./cliente/cliente-consulta/cliente-consulta.component";
import { ClienteEdicaoComponent } from "./cliente/cliente-edicao/cliente-edicao.component";
import { PedidoCadastroComponent } from "./pedido/pedido-cadastro/pedido-cadastro.component";
import { PedidoConsultaComponent } from "./pedido/pedido-consulta/pedido-consulta.component";
import { PedidoEdicaoComponent } from "./pedido/pedido-edicao/pedido-edicao.component";
import { VeiculoCadastroComponent } from "./veiculo/veiculo-cadastro/veiculo-cadastro.component";
import { VeiculoConsultaComponent } from "./veiculo/veiculo-consulta/veiculo-consulta.component";
import { VeiculoEdicaoComponent } from "./veiculo/veiculo-edicao/veiculo-edicao.component";
import { OpcionalCadastroComponent } from "./opcional/opcional-cadastro/opcional-cadastro.component";
import { OpcionalConsultaComponent } from "./opcional/opcional-consulta/opcional-consulta.component";
import { OpcionalEdicaoComponent } from "./opcional/opcional-edicao/opcional-edicao.component";

//mapeamento das rotas
const routes: Routes = [
    { path: '', component: LoginConsultaComponent }, /* raiz do projeto */
    { path: 'login-consulta', component: LoginConsultaComponent },
    { path: 'usuario-cadastro', component: UsuarioCadastroComponent },
    { path: 'cliente-cadastro', component: ClienteCadastroComponent },
    { path: 'cliente-consulta', component: ClienteConsultaComponent },
    { path: 'cliente-edicao/:idCliente', component: ClienteEdicaoComponent },
    { path: 'pedido-cadastro', component: PedidoCadastroComponent },
    { path: 'pedido-consulta', component: PedidoConsultaComponent },
    { path: 'pedido-edicao/:idPedido', component: PedidoEdicaoComponent },
    { path: 'veiculo-cadastro', component: VeiculoCadastroComponent },
    { path: 'veiculo-consulta', component: VeiculoConsultaComponent },
    { path: 'veiculo-edicao/:idVeiculo', component: VeiculoEdicaoComponent },
    { path: 'opcional-cadastro', component: OpcionalCadastroComponent },
    { path: 'opcional-consulta', component: OpcionalConsultaComponent },
    { path: 'opcional-edicao/:idOpcional', component: OpcionalEdicaoComponent }

];

//Registrando as rotas e o modulo
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

//gerando a classe para este arquivo de configuração
export class AppRoutingModule { }