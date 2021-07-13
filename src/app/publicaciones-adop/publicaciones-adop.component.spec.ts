import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesAdopComponent } from './publicaciones-adop.component';

describe('PublicacionesAdopComponent', () => {
  let component: PublicacionesAdopComponent;
  let fixture: ComponentFixture<PublicacionesAdopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionesAdopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesAdopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
