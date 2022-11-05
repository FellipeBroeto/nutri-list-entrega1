import { TestBed } from '@angular/core/testing';

import { ApiPacienteService } from './api-paciente.service';

describe('ApiService', () => {
  let service: ApiPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
