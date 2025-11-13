import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { AppRoutingModule } from './app.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule } from 'ngx-mask-2';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ClienteCadastroComponent } from './cliente/cliente-cadastro/cliente-cadastro.component';
import { ClienteConsultaComponent } from './cliente/cliente-consulta/cliente-consulta.component';
import { ClienteEdicaoComponent } from './cliente/cliente-edicao/cliente-edicao.component';
import { PedidoCadastroComponent } from './pedido/pedido-cadastro/pedido-cadastro.component';
import { PedidoConsultaComponent } from './pedido/pedido-consulta/pedido-consulta.component';
import { PedidoEdicaoComponent } from './pedido/pedido-edicao/pedido-edicao.component';
import { VeiculoCadastroComponent } from './veiculo/veiculo-cadastro/veiculo-cadastro.component';
import { VeiculoConsultaComponent } from './veiculo/veiculo-consulta/veiculo-consulta.component';
import { VeiculoEdicaoComponent } from './veiculo/veiculo-edicao/veiculo-edicao.component';
import { OpcionalCadastroComponent } from './opcional/opcional-cadastro/opcional-cadastro.component';
import { OpcionalConsultaComponent } from './opcional/opcional-consulta/opcional-consulta.component';
import { OpcionalEdicaoComponent } from './opcional/opcional-edicao/opcional-edicao.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LoginConsultaComponent } from './login/login-consulta/login-consulta.component';
import { UsuarioCadastroComponent } from './login/usuario-cadastro/usuario-cadastro.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ClienteCadastroComponent,
    ClienteConsultaComponent,
    ClienteEdicaoComponent,
    PedidoCadastroComponent,
    PedidoConsultaComponent,
    PedidoEdicaoComponent,
    VeiculoCadastroComponent,
    VeiculoConsultaComponent,
    VeiculoEdicaoComponent,
    OpcionalCadastroComponent,
    OpcionalConsultaComponent,
    OpcionalEdicaoComponent,
    LoginConsultaComponent,
    UsuarioCadastroComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    BrowserAnimationsModule,
    FilterPipeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
