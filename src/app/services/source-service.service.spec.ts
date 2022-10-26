import { TestBed } from '@angular/core/testing';

import { SourceServiceService } from './source-service.service';

describe('SourceServiceService', () => {
  let service: SourceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
