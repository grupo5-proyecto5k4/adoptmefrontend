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

  goToSignUpOptions(){
    this.router.navigate(['/signup-options']);
    window.scrollTo(0, 0);
  }

}