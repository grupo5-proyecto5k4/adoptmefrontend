import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupOptionsComponent } from './signup-options.component';



const routes: Routes = [
  {
    path: '',
    component: SignupOptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizacionSolicitudRoutingModule { }