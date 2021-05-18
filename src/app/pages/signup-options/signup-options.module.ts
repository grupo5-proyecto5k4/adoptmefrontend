import { NgModule } from '@angular/core';
import { SignupOptionsComponent } from './signup-options.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VisualizacionSolicitudRoutingModule } from './signup-options-routing.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';




@NgModule({
  declarations: [SignupOptionsComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    VisualizacionSolicitudRoutingModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    ComponentsModule
  ],
  entryComponents: [
  ],
  exports: [
    SignupOptionsComponent,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule
  ]
})
export class SignupOptionsModule {}