import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDonacionComponent } from './datos-donacion.component';

describe('DatosDonacionComponent', () => {
  let component: DatosDonacionComponent;
  let fixture: ComponentFixture<DatosDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDonacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
