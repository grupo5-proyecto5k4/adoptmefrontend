import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { LoginService } from 'src/app/pages/login/services/login.service';
//import { DataService } from 'src/app/pages/home/services/data.service';
//import { LocalStorageService } from 'src/shared/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import{ TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  activeProffessionalRol: boolean = true;
  isAdminRol: boolean = false;
  faPaw = faPaw;

  constructor(public router: Router,public dialog: MatDialog) { }

  openFaqs() {
    this.dialog.open(FaqsComponent)
  }
  goToHome()
  {
    this.dialog.open(FaqsComponent)
  }
  openTermsAndConditions(){
    this.dialog.open(TermsAndConditionsComponent)
  }

}
