import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupOptionsComponent } from './pages/signup-options/signup-options.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { FaqsComponent } from './faqs/faqs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AdminConfigurationsComponent } from './pages/admin-configurations/admin-configurations.component';
import { PublicacionesAdopComponent } from './publicaciones-adop/publicaciones-adop.component';
import { LeaftletPathComponent } from './leaftlet-path/leaftlet-path.component';
import { HabilitarCentroRescatistaComponent } from './pages/habilitar-centros-rescatistas/habilitar-centros-rescatistas.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistroMascotaComponent } from './registro-mascota/registro-mascota.component';
import { PublicacionesProvComponent } from './publicaciones-prov/publicaciones-prov.component';
import { AdministrarRecomendacionesComponent } from './pages/administrar-recomendaciones/administrar-recomendaciones.component';
import {GestionarUsuariosComponent} from '../app/gestionar-usuarios/gestionar-usuarios.component';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';
import { ReportesCentroComponent } from './reportes-centro/reportes-centro.component';
import { CenterProfileComponent } from './center-profile/center-profile.component';
import { NuevaMascotaComponent } from './nueva-mascota/nueva-mascota.component';
import { DonacionesComponent} from './donaciones/donaciones.component';
import { ReportesAdminComponent } from './reportes-admin/reportes-admin.component';
import { VisualizarAdopcionesComponent } from './visualizar-adopciones/visualizar-adopciones.component';
import { VisualizarProvisoriosComponent } from './visualizar-provisorios/visualizar-provisorios.component';
import { MascotasDisponiblesComponent } from './mascotas-disponibles/mascotas-disponibles.component';
import {UserProfileModalComponent} from './components/user-profile-modal/user-profile-modal.component';

const routes: Routes = [
  {
    path: 'adoptar',
    component: PublicacionesAdopComponent
  },
  {
    path: 'provisorio',
    component: PublicacionesProvComponent
  },
  {path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'mascotas',
    component: RegistroMascotaComponent
  },
  {
    path: 'reportesCentro',
    component: ReportesCentroComponent
  },
  {
    path: 'donaciones',
    component: DonacionesComponent
  },
  {
    path: 'configuraciones',
    component: AdminConfigurationsComponent
  },
  {
    path: 'gestionar-usuarios',
    component: GestionarUsuariosComponent
  },
  {
    path: 'visualizar-mascotas',
    component: MascotasDisponiblesComponent
  },
  {
    path: 'visualizar-adopciones',
    component: VisualizarAdopcionesComponent
  },
  {
    path: 'miperfil',
    component: UserProfileComponent
  },
  {
    path: 'perfiladmin',
    component: AdminProfileComponent
  },
  {
    path: 'visualizar-provisorios',
    component: VisualizarProvisoriosComponent
  },
  {
    path: 'administrar-recomendaciones',
    component: AdministrarRecomendacionesComponent
  },
  {
    path: 'habilitar-centros-rescatistas',
    component: HabilitarCentroRescatistaComponent
  },
  {
    path: 'reportes',
    component: ReportesAdminComponent
  },
  {
    path: 'opciones-de-registro',
    component: SignupOptionsComponent
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'mapas',
    component: LeaftletPathComponent
  },
  {

    path: 'faqs',
    component: FaqsComponent
  },
  {
    path: 'solicitudes',
    component: ListadoSolicitudesComponent
  },
  {
    path: 'micentro',
    component: CenterProfileComponent
  },
  {path:'modCentroDonacion',
  component:UserProfileModalComponent},
  {
    path: 'registrar-mascota',
    component: NuevaMascotaComponent
  },
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  //La ruta comod??n '**' siempre debe ser la ??ltima del listado.
  {
    path: '**',
    component: NotFoundComponent
  },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
