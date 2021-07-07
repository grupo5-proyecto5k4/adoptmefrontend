import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';


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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private localStorageService: LocalStorageService) {
    debugger;
    this.localStorageService.setProfile(1); //ESTO UNA VEZ QUE SE LOGUEEN LOS USUARIOS HAY QUE SETEARLO DESDE EL LOGIN
    this.profile = this.localStorageService.getProfile();
  }
  

  isSignupOptions(){
    return (this.router.url == '/signup-options');
  }

  isLogued(){
    return (this.profile != null || this.profile != undefined)
  }

  scrollTop(){
    document.getElementsByTagName('mat-sidenav-content')[0].scrollTo(0, 0)
  }

  isParticular(){
    return (this.profile == '3')
  }

  isRescatist(){
    return (this.profile == '2')
  }

  isAdmin(){
    return (this.profile == '1')
  }
}
