import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudProvisorioComponent } from './solicitud-provisorio.component';

describe('SolicitudProvisorioComponent', () => {
  let component: SolicitudProvisorioComponent;
  let fixture: ComponentFixture<SolicitudProvisorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudProvisorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudProvisorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
