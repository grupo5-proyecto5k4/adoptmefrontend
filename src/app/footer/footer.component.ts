import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import{ TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import {LandingPageComponent} from '../landing-page/landing-page.component';
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
  

  goToHome(){
    this.dialog.open(LandingPageComponent).updatePosition({ bottom:'627px'})    
     //document.getElementById("quienesomos").scrollTo(0, 0);
  }

  openTermsAndConditions(){
    this.dialog.open(TermsAndConditionsComponent)
  }

}




