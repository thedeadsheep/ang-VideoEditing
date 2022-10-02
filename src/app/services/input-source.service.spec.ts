import { TestBed } from '@angular/core/testing';

import { InputSourceService } from './input-source.service';

describe('InputSourceService', () => {
  let service: InputSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
