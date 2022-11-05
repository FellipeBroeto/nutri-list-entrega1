import { TestBed } from '@angular/core/testing';

import { ApiNutricionistaService } from './api-nutricionista.service';

describe('ApiService', () => {
  let service: ApiNutricionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNutricionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
