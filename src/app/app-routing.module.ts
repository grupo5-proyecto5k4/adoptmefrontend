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
import { CenterProfileComponent } from './center-profile/center-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistroMascotaComponent } from './registro-mascota/registro-mascota.component';
import { PublicacionesProvComponent } from './publicaciones-prov/publicaciones-prov.component';
import { NuevaMascotaComponent } from './nueva-mascota/nueva-mascota.component';
import { AdministrarRecomendacionesComponent } from './pages/administrar-recomendaciones/administrar-recomendaciones.component';
import {VacunacionesComponent} from '../app/vacunaciones/vacunaciones.component';
import {GestionarUsuariosComponent} from '../app/gestionar-usuarios/gestionar-usuarios.component';

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
    path: 'registrar-mascota',
    component: NuevaMascotaComponent
  },

  {
    path: 'donaciones',
    component: UnderConstructionComponent
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
    path: 'gestionar-mascotas',
    component: UnderConstructionComponent
  },
  {
    path: 'visualizar-adopciones',
    component: UnderConstructionComponent
  },
  {
    path: 'miperfil',
    component: UserProfileComponent
  },
  {
    path: 'micentro',
    component: CenterProfileComponent
  },
  {
    path: 'perfiladmin',
    component: AdminProfileComponent
  },
  {
    path: 'visualizar-provisorios',
    component: UnderConstructionComponent
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
    component: UnderConstructionComponent
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
    path: 'vacunaciones',
    component: VacunacionesComponent
  },
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  //La ruta comodín '**' siempre debe ser la última del listado.
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
