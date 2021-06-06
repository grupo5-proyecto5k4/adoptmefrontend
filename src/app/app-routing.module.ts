import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupOptionsComponent } from './pages/signup-options/signup-options.component';
import {UnderConstructionComponent} from './under-construction/under-construction.component';

const routes: Routes = [
  { 
    path: 'adoptar', 
    component: UnderConstructionComponent},
  { 
    path: 'provisorio', 
    component: UnderConstructionComponent},
  {
    path:'signup-options',
    component: SignupOptionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
