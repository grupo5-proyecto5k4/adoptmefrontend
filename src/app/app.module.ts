import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import{SignupOptionsModule} from './pages/signup-options/signup-options.module';
import {FooterComponent} from 'src/app/footer/footer.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    FontAwesomeModule,
    MatListModule,
    MatDialogModule,
    ComponentsModule,
    ReactiveFormsModule, 
    FormsModule,
<<<<<<< HEAD
    HttpClientModule
=======
    SignupOptionsModule
>>>>>>> af56e04228b3df7eaf79f26035d6305cc51e3ea9
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
