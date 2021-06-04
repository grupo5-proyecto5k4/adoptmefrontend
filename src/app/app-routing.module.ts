import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnderConstructionComponent} from './under-construction/under-construction.component';

const routes: Routes = [
  { 
    path: 'adoptar', 
    component: UnderConstructionComponent},
  { 
    path: 'provisorio', 
    component: UnderConstructionComponent},
  {
    path: 'signup-options',
    loadChildren: () => import('./pages/signup-options/signup-options.module').then(m => m.SignupOptionsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
