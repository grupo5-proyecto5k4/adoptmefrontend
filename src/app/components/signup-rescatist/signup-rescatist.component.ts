import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertsService } from 'src/utils/alerts.service';
import { SignupService } from 'src/services/signup.service';
import { User } from 'src/models/IUser';
import { Address } from 'src/models/IAddress';

@Component({
  selector: 'app-signup-rescatist',
  templateUrl: './signup-rescatist.component.html',
  styleUrls: ['./signup-rescatist.component.scss']
})
export class SignupRescatistComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar cuenta";
  isLoading: Boolean = false;

  constructor(private SignupService: SignupService, private alertsService: AlertsService, private dialogref: MatDialogRef<SignupRescatistComponent>) { }

  ngOnInit() {
    this.SignupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z-ñÑÁÉÍÓÚáéíóú. ]*$')]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,13}')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[^A-Z]*[A-Z])(?=.*[^0-9]*[0-9])[a-zA-Z0-9!@$.]{8,15}$')]),
      street:  new FormControl('', [Validators.required, Validators.maxLength(50)]),
      altura:  new FormControl('', [Validators.pattern('[0-9]')]),
      reference: new FormControl('', [Validators.maxLength(150)]),
      barrio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      localidad: new FormControl({value: 'Córdoba Capital', disabled: true}),
  });
  this.dialogref.disableClose = true;
}


validateButton() {
  if (this.SignupForm.valid) {
    document.getElementById("confirmar").classList.remove("buttonDisabled");
  } else {
    document.getElementById("confirmar").classList.add("buttonDisabled");
  }
}

  validateCalle() {
    return (((this.SignupForm.get('street').touched ||
      this.SignupForm.get('street').dirty) &&
      this.SignupForm.get('street').errors));
  }

  validateAltura() {
    return (((this.SignupForm.get('altura').touched ||
      this.SignupForm.get('altura').dirty) &&
      this.SignupForm.get('altura').errors));
  }

  validateBarrio() {
    return (((this.SignupForm.get('barrio').touched ||
      this.SignupForm.get('barrio').dirty) &&
      this.SignupForm.get('barrio').errors));
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
        //Acá seteamos los valores de la dirección
        let userAddress: Address = new Address();
        userAddress.calle = this.SignupForm.controls.street.value;
        userAddress.numero = this.SignupForm.controls.altura.value;
        userAddress.referencia = this.SignupForm.controls.reference.value;
        userAddress.localidad = "Córdoba Capital";
        userAddress.barrio = this.SignupForm.controls.barrio.value;
        
        //Acá seteamos los valores del usuario
        let particularUser: User = new User();
        particularUser.nombres = this.SignupForm.controls.name.value;
        particularUser.correoElectronico = this.SignupForm.controls.email.value;
        particularUser.numeroContacto = this.SignupForm.controls.contactNumber.value;
        if (this.SignupForm.controls.facebook.value !== "") {
          particularUser.facebook = this.SignupForm.controls.facebook.value;
        }
        if (this.SignupForm.controls.instagram.value !== "") {
          particularUser.instagram = this.SignupForm.controls.instagram.value;
        }
        particularUser.contrasenia = this.SignupForm.controls.password.value;
        //Acá seteamos al usuario la dirección creada anteriormente
        particularUser.Direccion = userAddress;
              this.SignupService.registerUser(particularUser).subscribe({
        complete: () => {
          this.alertsService.confirmMessage("Su cuenta ha sido registrada y será verificada a la brevedad").then((result) => window.location.href = '/');
        },
        error: (err: any) => {
          this.alertsService.errorMessage(err.error.error).then((result) => {
            this.isLoading = false;
          }
        )
        }
      })
      }
    }

  async init() {
   
  }
}
