import { TestBed } from '@angular/core/testing';

import { BaseMethodsService } from './base-methods.service';

describe('BaseMethodsService', () => {
  let service: BaseMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
