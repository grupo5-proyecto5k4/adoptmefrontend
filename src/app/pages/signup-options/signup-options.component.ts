import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SignupParticularComponent } from 'src/app/components/signup-particular/signup-particular.component';
import { SignupRescatistComponent } from 'src/app/components/signup-rescatist/signup-rescatist.component';



@Component({
  selector: 'app-signup-options',
  templateUrl: './signup-options.component.html',
  styleUrls: ['./signup-options.component.scss'],
})


export class SignupOptionsComponent {
  Titulo = "¿Cómo querés registrarte?";

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit() { 
    if(this.authService.isLogued()){
      window.scrollTo(0, 0);
      this.router.navigate(['/']);
    }
  }

  signupParticular() {
    this.dialog.open(SignupParticularComponent)
  }
  signupRescatist() {
    this.dialog.open(SignupRescatistComponent)
  }

}
