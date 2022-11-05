import { TestBed } from '@angular/core/testing';

import { ApiDietasService } from './api-dietas.service';

describe('ApiService', () => {
  let service: ApiDietasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDietasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
