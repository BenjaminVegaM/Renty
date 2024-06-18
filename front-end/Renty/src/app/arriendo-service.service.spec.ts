import { TestBed } from '@angular/core/testing';

import { ArriendoServiceService } from './arriendo-service.service';

describe('ArriendoServiceService', () => {
  let service: ArriendoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArriendoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
