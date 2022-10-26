import { TestBed } from '@angular/core/testing';

import { RenderServiceService } from './render-service.service';

describe('RenderServiceService', () => {
  let service: RenderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
