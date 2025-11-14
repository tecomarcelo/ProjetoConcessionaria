import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";

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
    { path: 'cliente-cadastro', component: ClienteCadastroComponent, canActivate: [AuthenticationGuard] },
    { path: 'cliente-consulta', component: ClienteConsultaComponent, canActivate: [AuthenticationGuard] },
    { path: 'cliente-edicao/:idCliente', component: ClienteEdicaoComponent, canActivate: [AuthenticationGuard] },
    { path: 'pedido-cadastro', component: PedidoCadastroComponent, canActivate: [AuthenticationGuard] },
    { path: 'pedido-consulta', component: PedidoConsultaComponent, canActivate: [AuthenticationGuard] },
    { path: 'pedido-edicao/:idPedido', component: PedidoEdicaoComponent, canActivate: [AuthenticationGuard] },
    { path: 'veiculo-cadastro', component: VeiculoCadastroComponent, canActivate: [AuthenticationGuard] },
    { path: 'veiculo-consulta', component: VeiculoConsultaComponent, canActivate: [AuthenticationGuard] },
    { path: 'veiculo-edicao/:idVeiculo', component: VeiculoEdicaoComponent, canActivate: [AuthenticationGuard] },
    { path: 'opcional-cadastro', component: OpcionalCadastroComponent, canActivate: [AuthenticationGuard] },
    { path: 'opcional-consulta', component: OpcionalConsultaComponent, canActivate: [AuthenticationGuard] },
    { path: 'opcional-edicao/:idOpcional', component: OpcionalEdicaoComponent, canActivate: [AuthenticationGuard] }

];

//Registrando as rotas e o modulo
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

//gerando a classe para este arquivo de configuração
export class AppRoutingModule { }