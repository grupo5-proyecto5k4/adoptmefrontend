import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPerroComponent } from './formulario-perro.component';

describe('FormularioPerroComponent', () => {
  let component: FormularioPerroComponent;
  let fixture: ComponentFixture<FormularioPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPerroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
