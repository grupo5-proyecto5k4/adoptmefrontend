import { Component, OnInit } from '@angular/core';
import { faBullhorn, faFileContract, faDesktop} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'landing',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  faBullhorn = faBullhorn;
  faFileContract = faFileContract;
  faDesktop = faDesktop;

  constructor() { }

  ngOnInit(): void {
  }

}
