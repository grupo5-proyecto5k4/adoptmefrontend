import { Component,OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adoptmefrontend';
constructor(private router: Router) { }

  ngOnInit() {

  }

  isLandingPage(){
    return (this.router.url == '/');
  }

  goToSignUpOptions(){
    this.router.navigate(['/opciones-de-registro']);
    window.scrollTo(0, 0);
  }

}