import { NgModule } from '@angular/core';
import { SignupOptionsComponent } from './signup-options.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { ComponentsModule } from 'src/app/components/components.module';
import { SignUpOptionsRoutingModule } from './signup-options-routing.module';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [SignupOptionsComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SignUpOptionsRoutingModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    ComponentsModule,
    ComponentsModule, 
    MatCardModule,
  ],
  entryComponents: [
  ],
  exports: [
    SignupOptionsComponent,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SignupOptionsModule {}