import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component'; 
import { FrmReporteComponent } from './frm-reporte/frm-reporte.component';
import { FrmCargaComponent } from './frm-carga/frm-carga.component';
import { FrmResultadoComponent } from './frm-resultado/frm-resultado.component';
import { FmrUsuarioComponent } from './fmr-usuario/fmr-usuario.component';
import { FmrErroresComponent } from './fmr-errores/fmr-errores.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent, 
    FrmReporteComponent,
    FrmCargaComponent,
    FrmResultadoComponent,
    FmrUsuarioComponent,
    FmrErroresComponent,
    AcercaDeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
