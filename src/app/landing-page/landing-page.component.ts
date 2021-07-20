import { Component, OnInit } from '@angular/core';
import { faBullhorn, faFileContract, faDesktop} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  faBullhorn = faBullhorn;
  faFileContract = faFileContract;
  faDesktop = faDesktop;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToSignUpOptions(){
    this.router.navigate(['/opciones-de-registro']);
    window.scrollTo(0, 0);
  }

  scrollTop(){
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0);
  }

}