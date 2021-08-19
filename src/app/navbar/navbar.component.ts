import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';
import{AuthService} from '../auth.service';
import { stringify } from '@angular/compiler/src/util';



@Component({
  selector: 'app-navbar',
  templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faPaw = faPaw;
  profile: string;
  iniciales: string = "";
  currentUser: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authservice: AuthService, private router: Router, private localStorageService: LocalStorageService) {
    this.profile = this.localStorageService.getProfile();
    if (this.isLogued){
      this.currentUser = this.authservice.getCurrentUser();
      if (this.profile == '0' || this.profile == '1'){
        this.iniciales = ((this.currentUser.nombres).split("", 1)+(this.currentUser.apellidos).split("", 1)); 
      }
      else if (this.profile == '2'){
        let nombre = (this.currentUser.nombres).split(""); 
        this.iniciales = nombre[0]+nombre[1];
      }
    }
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
