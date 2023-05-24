import { TestBed } from '@angular/core/testing';

import { DeactiveGuardService } from './deactive-guard.service';

describe('DeactiveGuardService', () => {
  let service: DeactiveGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeactiveGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
