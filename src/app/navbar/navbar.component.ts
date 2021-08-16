import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';
import{AuthService} from '../auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faPaw = faPaw;
  profile: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authservice: AuthService, private router: Router, private localStorageService: LocalStorageService) {

    this.profile = this.localStorageService.getProfile();
  }
  

  isSignupOptions(){
    return (this.router.url == '/signup-options');
  }

  isInicioSesion(){
    return (this.router.url == '/inicio-sesion');
  }

  isLogued(){
    return (this.profile != null || this.profile != undefined)
  }

  scrollTop(){
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0)
  }

  isParticular(){
    return (this.profile == '1')
  }

  isRescatist(){
    return (this.profile == '2')
  }

  isAdmin(){
    return (this.profile == '0')
  }

  logOut(){
    this.authservice.cerrarSesion();
    window.location.href = "/landing";
  }

}
