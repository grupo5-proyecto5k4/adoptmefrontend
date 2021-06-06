import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupParticularComponent } from './signup-particular/signup-particular.component';
import { SignupRescatistComponent } from './signup-rescatist/signup-rescatist.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    declarations: [SignupParticularComponent, SignupRescatistComponent],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      MatTooltipModule,
    ],
    providers:[],
    exports: [
      SignupParticularComponent,
      SignupRescatistComponent,
     ]
  })
export class ComponentsModule{}
