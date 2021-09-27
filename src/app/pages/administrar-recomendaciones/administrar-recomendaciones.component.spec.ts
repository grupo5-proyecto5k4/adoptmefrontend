import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrarRecomendacionesComponent } from './administrar-recomendaciones.component';



describe('LeaftletPathComponent', () => {
  let component: AdministrarRecomendacionesComponent;
  let fixture: ComponentFixture<AdministrarRecomendacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarRecomendacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
