import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import { PagInicioComponent } from './pag-inicio.component';

describe('PagInicioComponent', () => {
  let component: PagInicioComponent;
  let fixture: ComponentFixture<PagInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
