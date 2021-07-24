import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcercaDeComponent } from "./acerca-de/acerca-de.component";
import { FmrErroresComponent } from "./fmr-errores/fmr-errores.component";
import { FmrUsuarioComponent } from "./fmr-usuario/fmr-usuario.component";
import { FrmCargaComponent } from "./frm-carga/frm-carga.component";
import { FrmReporteComponent } from "./frm-reporte/frm-reporte.component";
import { FrmResultadoComponent } from "./frm-resultado/frm-resultado.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'fmr-carga', component: FrmCargaComponent },
    { path: 'fmr-reporte', component: FrmReporteComponent },
    { path: 'fmr-resulado', component: FrmResultadoComponent },
    { path: 'fmr-user', component: FmrUsuarioComponent  },
    { path: 'fmr-errores', component: FmrErroresComponent  },
    { path: 'acerca-de', component: AcercaDeComponent  }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
  })
export class AppRoutingModule { }