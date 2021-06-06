import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupParticularService } from 'src/services/signup-particular.service';
import { ParticularUser } from 'src/models/IParticularUser';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';

@Component({
  selector: 'app-signup-particular',
  templateUrl: './signup-particular.component.html',
  styleUrls: ['./signup-particular.component.scss']
})
export class SignupParticularComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar cuenta";
  
  
  constructor(private SignupParticularService: SignupParticularService, private alertsService: AlertsService) { }
  
  ngOnInit() {
    this.SignupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑ ]*$')]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑ ]*$')]),
      contactNumber: new FormControl('', [Validators.pattern('[0-9]{10,13}')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{7,8}')]),
      birthDate: new FormControl('', [Validators.required]),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
  });
  }
  
  validateInitialDate() {
    return (this.SignupForm.get('birthDate').touched && (this.SignupForm.controls.birthDate.value == ""));
  }

  CalculateAge() {
    debugger;
    const today: Date = new Date();
    const birthDate: Date = new Date(this.SignupForm.controls.birthDate.value);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18){
      return true;
    }
    else{
      return false;
    }
}

validateName() {
  return (((this.SignupForm.get('name').touched ||
  this.SignupForm.get('name').dirty) &&
  this.SignupForm.get('name').errors));
}

validateLastname() {
  return (((this.SignupForm.get('lastname').touched ||
  this.SignupForm.get('lastname').dirty) &&
  this.SignupForm.get('lastname').errors));
}

validateDNI() {
  return (((this.SignupForm.get('dni').touched ||
  this.SignupForm.get('dni').dirty) &&
  this.SignupForm.get('dni').errors));
}

validateBirthdate() {
  return (((this.SignupForm.get('birthDate').touched ||
  this.SignupForm.get('birthDate').dirty) &&
  this.SignupForm.get('birthDate').errors));
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
