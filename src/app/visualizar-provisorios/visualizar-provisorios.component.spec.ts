import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarProvisoriosComponent } from './visualizar-provisorios.component';



describe('VisualizarProvisoriosComponent', () => {
  let component: VisualizarProvisoriosComponent;
  let fixture: ComponentFixture<VisualizarProvisoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarProvisoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarProvisoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
