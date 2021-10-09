import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionSolicitudComponent } from './visualizacion-solicitud.component';

describe('VisualizacionSolicitudComponent', () => {
  let component: VisualizacionSolicitudComponent;
  let fixture: ComponentFixture<VisualizacionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacionSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
