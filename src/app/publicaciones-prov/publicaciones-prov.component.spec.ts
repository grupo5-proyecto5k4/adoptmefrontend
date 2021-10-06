import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesProvComponent } from './publicaciones-prov.component';

describe('PublicacionesProvComponent', () => {
  let component: PublicacionesProvComponent;
  let fixture: ComponentFixture<PublicacionesProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionesProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
