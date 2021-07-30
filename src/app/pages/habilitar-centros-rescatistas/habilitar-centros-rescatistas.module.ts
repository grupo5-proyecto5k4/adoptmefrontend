import { NgModule } from '@angular/core';
import { HabilitarCentroRescatistaComponent } from './habilitar-centros-rescatistas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [HabilitarCentroRescatistaComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    ComponentsModule,
    ComponentsModule, 
    MatCardModule,
    MatTabsModule, 
    MatPaginatorModule,

  ],
  entryComponents: [
  ],
  exports: [
    HabilitarCentroRescatistaComponent,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule, 
    MatPaginatorModule 
  ]
})
export class HabilitarCentroRescatistaModule {}