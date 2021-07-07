import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupOptionsComponent } from './pages/signup-options/signup-options.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { FaqsComponent } from './faqs/faqs.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: 'adoptar',
    component: UnderConstructionComponent
  },
  {
    path: 'provisorio',
    component: UnderConstructionComponent
  },
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
    component: UnderConstructionComponent
  },
  {
    path: 'reportes',
    component: UnderConstructionComponent
  },
  {
    path: 'signup-options',
    component: SignupOptionsComponent
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },

  {
    path: 'faqs',
    component: FaqsComponent
  }

  , {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  //La ruta comodín '**' siempre debe ser la última del listado.
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
