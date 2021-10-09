import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCentroComponent } from './reportes-centro.component';

describe('ReportesCentroComponent', () => {
  let component: ReportesCentroComponent;
  let fixture: ComponentFixture<ReportesCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
