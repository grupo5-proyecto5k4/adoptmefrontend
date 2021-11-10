import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarAdopcionesComponent } from './visualizar-adopciones.component';



describe('VisualizarAdopcionesComponent', () => {
  let component: VisualizarAdopcionesComponent;
  let fixture: ComponentFixture<VisualizarAdopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarAdopcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
