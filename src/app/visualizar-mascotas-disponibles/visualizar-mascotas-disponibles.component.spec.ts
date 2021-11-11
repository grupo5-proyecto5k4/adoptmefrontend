import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarMascotasDisponiblesComponent } from './visualizar-mascotas-disponibles.component';



describe('VisualizarMascotasDisponiblesComponent', () => {
  let component: VisualizarMascotasDisponiblesComponent;
  let fixture: ComponentFixture<VisualizarMascotasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarMascotasDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarMascotasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
