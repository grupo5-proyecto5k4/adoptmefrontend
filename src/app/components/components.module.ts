import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupParticularComponent } from './signup-particular/signup-particular.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [SignupParticularComponent],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MatDialogModule
    ],
    providers:[],
    exports: [
      SignupParticularComponent,
     ]
  })
export class ComponentsModule{}
