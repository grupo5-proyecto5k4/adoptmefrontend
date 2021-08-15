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
import { SignupOptionsModule } from './pages/signup-options/signup-options.module';
import {FooterComponent} from 'src/app/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AdminConfigurationsModule } from './pages/admin-configurations/admin-configurations.module';
import { PublicacionesAdopComponent } from './publicaciones-adop/publicaciones-adop.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistroMascotaComponent } from './registro-mascota/registro-mascota.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HabilitarCentroRescatistaModule } from './pages/habilitar-centros-rescatistas/habilitar-centros-rescatistas.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    UnderConstructionComponent,
    FaqsComponent,
    TermsAndConditionsComponent,
    NotFoundComponent,
    PublicacionesAdopComponent,
    InicioSesionComponent,
    RegistroMascotaComponent,
    PublicacionesAdopComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatInputModule,
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
    HttpClientModule,
    SignupOptionsModule,
    AdminConfigurationsModule,
    HabilitarCentroRescatistaModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
