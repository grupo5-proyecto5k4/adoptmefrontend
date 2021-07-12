import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaftletPathComponent } from './leaftlet-path.component';

describe('LeaftletPathComponent', () => {
  let component: LeaftletPathComponent;
  let fixture: ComponentFixture<LeaftletPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaftletPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaftletPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
