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


const routes: Routes = [
  {
    path: 'adoptar',
    component: PublicacionesAdopComponent
  },
  {
    
    path: 'provisorio',
    component: UnderConstructionComponent
  },
  {path: 'inicio-sesion',
    component:InicioSesionComponent},
  {
    path: 'mascotas',
    component: UnderConstructionComponent
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
    component: UnderConstructionComponent
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
    path: 'visualizar-provisorios',
    component: UnderConstructionComponent
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
