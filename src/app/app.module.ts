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
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
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
import { FormularioPerroComponent } from './formulario-perro/formulario-perro.component';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HabilitarCentroRescatistaModule } from './pages/habilitar-centros-rescatistas/habilitar-centros-rescatistas.module';
import {FileUploadModule} from 'ng2-file-upload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CenterProfileComponent } from './center-profile/center-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import { PublicacionesProvComponent } from './publicaciones-prov/publicaciones-prov.component';
import { NuevaMascotaComponent } from './nueva-mascota/nueva-mascota.component';
import { AdministrarRecomendacionesModule } from './pages/administrar-recomendaciones/administrar-recomendaciones.module';
//import { PublicacionesProvComponent } from './publicaciones-prov/publicaciones-prov.component';
import {MatTableModule} from '@angular/material/table';
import { GestionarUsuariosModule } from './gestionar-usuarios/gestionar-usuarios.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';
import { VisualizacionSolicitudComponent } from './visualizacion-solicitud/visualizacion-solicitud.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SolicitudProvisorioComponent } from './solicitud-provisorio/solicitud-provisorio.component';
import { ReportesCentroComponent } from './reportes-centro/reportes-centro.component';
import { ChartsModule } from 'ng2-charts';
import { VisualizacionSolicitudProviComponent } from './visualizacion-solicitud-provi/visualizacion-solicitud-provi.component';
import { DonacionesComponent } from './donaciones/donaciones.component';
import { DatosDonacionComponent } from './datos-donacion/datos-donacion.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReportesAdminComponent } from './reportes-admin/reportes-admin.component';

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
    FormularioPerroComponent,
    PublicacionesAdopComponent,
    UserProfileComponent,
    CenterProfileComponent,
    AdminProfileComponent,
    PublicacionesProvComponent,
    NuevaMascotaComponent,
    ListadoSolicitudesComponent,
    VisualizacionSolicitudComponent,
    SolicitudProvisorioComponent,
    ReportesCentroComponent,
    VisualizacionSolicitudProviComponent,
    DonacionesComponent,
    DatosDonacionComponent,
    ReportesAdminComponent
    //PublicacionesProvComponent

  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
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
    AdministrarRecomendacionesModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    FileUploadModule,
    MatRadioModule,
    MatSlideToggleModule,
    GestionarUsuariosModule,
    MatBadgeModule,
    MatRadioModule,
    MatCheckboxModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
