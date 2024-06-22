import { TestBed } from '@angular/core/testing';

import { BoletaServiceService } from './boleta-service.service';

describe('BoletaServiceService', () => {
  let service: BoletaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoletaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
