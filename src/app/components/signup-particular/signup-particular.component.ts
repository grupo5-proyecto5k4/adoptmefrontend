import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-signup-particular',
  templateUrl: './signup-particular.component.html',
  styleUrls: ['./signup-particular.component.scss']
})
export class SignupParticularComponent implements OnInit {
  SignupForm: FormGroup;
  Titulo = "Registrar cuenta";

  constructor() { }

  ngOnInit() {
    this.SignupForm = new FormGroup({
      initialDate: new FormControl('', [Validators.required]),
      finalDate: new FormControl('', [Validators.required]),
  });
  }

  async init() {
   
  }
}
