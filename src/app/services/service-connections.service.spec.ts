import { TestBed } from '@angular/core/testing';

import { ServiceConnectionsService } from './service-connections.service';

describe('ServiceConnectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceConnectionsService = TestBed.get(ServiceConnectionsService);
    expect(service).toBeTruthy();
  });
});
