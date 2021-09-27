import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunacionesComponent } from './vacunaciones.component';

describe('VacunacionesComponent', () => {
  let component: VacunacionesComponent;
  let fixture: ComponentFixture<VacunacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
