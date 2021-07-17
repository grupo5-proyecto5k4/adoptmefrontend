import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SignupService } from 'src/services/signup.service';
import { User } from 'src/models/IUser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertsService } from 'src/utils/alerts.service';

@Component({
  selector: 'app-signup-particular',
  templateUrl: './signup-particular.component.html',
  styleUrls: ['./signup-particular.component.scss']
})
export class SignupParticularComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar cuenta";
  edadInvalida: Boolean = false;
  mensajeEdad: string = "";
  isLoading: Boolean = false;



  constructor(private SignupService: SignupService, private alertsService: AlertsService, private dialogref: MatDialogRef<SignupParticularComponent>) { }

  ngOnInit() {
    this.SignupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú ]*$')]),
      contactNumber: new FormControl('', [Validators.pattern('[0-9]{10,13}')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^a-z]*[a-z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{7,8}')]),
      birthDate: new FormControl('', [Validators.required]),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
    });
    this.dialogref.disableClose = true;
  }

  close(){
    this.dialogref.close();
  }

  validateInitialDate() {
    return (this.SignupForm.get('birthDate').touched && (this.SignupForm.controls.birthDate.value == ""));
  }

  CalculateAge() {
      const today: Date = new Date();
      const birthDate: Date = new Date(this.SignupForm.controls.birthDate.value);
      let age: number = today.getFullYear() - birthDate.getFullYear();
      const month: number = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        this.edadInvalida = true;
        this.mensajeEdad = "Debe ser mayor a 18 años";
      }
      else if (age > 100){
        this.edadInvalida = true;
        this.mensajeEdad = "Edad no válida";
      }
      else {
        this.edadInvalida = false;
      }
  }


  validarCampos() {
    if (this.SignupForm.valid && !this.SignupForm.pristine) {
      document.getElementById("changePassword").classList.remove('disabledBtnPassword');
    }
    else{
      document.getElementById("changePassword").classList.add('disabledBtnPassword');
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


  signup() {
    if (this.SignupForm.valid) {
      this.isLoading = true;

      let particularUser: User = new User();
      particularUser.nombres = this.SignupForm.controls.name.value;
      particularUser.apellidos = this.SignupForm.controls.lastname.value;
      particularUser.correoElectronico = this.SignupForm.controls.email.value;
      particularUser.numeroContacto = this.SignupForm.controls.contactNumber.value;
      particularUser.dni = this.SignupForm.controls.dni.value;
      if (this.SignupForm.controls.facebook.value !== "") {
        particularUser.facebook = this.SignupForm.controls.facebook.value;
      }
      if (this.SignupForm.controls.instagram.value !== "") {
        particularUser.instagram = this.SignupForm.controls.instagram.value;
      }

      particularUser.contrasenia = this.SignupForm.controls.password.value;
      this.SignupService.registerUser(particularUser).subscribe({
        complete: () => {
          this.alertsService.confirmMessage("Su cuenta ha sido registrada").then((result) => window.location.href = '/');
        },
        error: (err: any) => {
          this.isLoading = false;
          this.alertsService.errorMessage(err)
        }
      })
    }
    
  }

  async init() {

  }
}
