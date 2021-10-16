import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionSolicitudProviComponent } from './visualizacion-solicitud-provi.component';

describe('VisualizacionSolicitudProviComponent', () => {
  let component: VisualizacionSolicitudProviComponent;
  let fixture: ComponentFixture<VisualizacionSolicitudProviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacionSolicitudProviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionSolicitudProviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
