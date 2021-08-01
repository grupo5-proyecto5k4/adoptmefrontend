import { TestBed } from '@angular/core/testing';

import { RegistroMascotasService } from './registro-mascotas.service';

describe('RegistroMascotasService', () => {
  let service: RegistroMascotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMascotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
