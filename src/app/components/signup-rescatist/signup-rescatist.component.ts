import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupRescatistService } from 'src/services/signup-rescatist.service';
import { RescatistUser } from 'src/models/IRescatistUser';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertsService } from 'src/utils/alerts.service';

@Component({
  selector: 'app-signup-rescatist',
  templateUrl: './signup-rescatist.component.html',
  styleUrls: ['./signup-rescatist.component.scss']
})
export class SignupRescatistComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar cuenta";

  constructor(private SignupRescatistService: SignupRescatistService, private alertsService: AlertsService) { }

  ngOnInit() {
    this.SignupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z-ñÑ ]*$')]),
      contactNumber: new FormControl('', [Validators.pattern('[0-9]{10,13}')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')]),
      street:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
      altura:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{3,4}')]),
      reference: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      barrio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      localidad: new FormControl(''),
  });
  }

  validateContactNumber() {
    return (((this.SignupForm.get('contactNumber').touched ||
    this.SignupForm.get('contactNumber').dirty) &&
    this.SignupForm.get('contactNumber').errors));
  }
  
  validatePassword() {
    return (((this.SignupForm.get('password').touched ||
    this.SignupForm.get('password').dirty) &&
    this.SignupForm.get('password').errors));
  }


  signup(){
    debugger;
    if (this.SignupForm.valid) {
      this.alertsService.confirmMessage("Su cuenta ha sido registrada");
    }
    else{
      this.alertsService.infoMessage("Por favor complete los campos requeridos","Atención")
    }
  }

  /*
  signup() {
      if (this.SignupForm.valid) {
        let particularUser: ParticularUser = new ParticularUser();
        particularUser.name = this.SignupForm.controls.name.value;
        particularUser.lastname = this.SignupForm.controls.lastname.value;
        particularUser.email = this.SignupForm.controls.email.value;
        particularUser.contactNumber = this.SignupForm.controls.contactNumber.value;
        if (this.SignupForm.controls.facebook.value !== "") {
          particularUser.facebook = this.SignupForm.controls.facebook.value;
        }
        if (this.SignupForm.controls.instagram.value !== "") {
          particularUser.instagram = this.SignupForm.controls.instagram.value;
        }

        particularUser.password = this.SignupForm.controls.password.value;
      }
    }
    */
  async init() {
   
  }
}
