import { TestBed } from '@angular/core/testing';

import { ApiAlimentosService } from './api-alimentos.service';

describe('ApiService', () => {
  let service: ApiAlimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAlimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
