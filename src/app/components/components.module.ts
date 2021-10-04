import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupParticularComponent } from './signup-particular/signup-particular.component';
import { SignupRescatistComponent } from './signup-rescatist/signup-rescatist.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserFormComponent } from './user-form/user-form.component';
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal.component';
import { VerMascotaComponent } from './ver-mascota/ver-mascota.component';
import {MatTableModule} from '@angular/material/table';




@NgModule({
    declarations: [SignupParticularComponent, SignupRescatistComponent, UserFormComponent, UserProfileModalComponent, VerMascotaComponent],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MatDialogModule,
      MatInputModule,
      MatFormFieldModule,
      MatTooltipModule,
      MatRadioModule,
      MatCheckboxModule,
      MatTableModule
    ],
    providers:[],
    exports: [
      SignupParticularComponent,
      SignupRescatistComponent,
      UserFormComponent,
      UserProfileModalComponent,
      VerMascotaComponent
     ]
  })
export class ComponentsModule{}
