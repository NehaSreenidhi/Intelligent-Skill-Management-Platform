import { TestBed } from '@angular/core/testing';

import { InternProfileService } from './intern-profile.service';

describe('InternProfileService', () => {
  let service: InternProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
