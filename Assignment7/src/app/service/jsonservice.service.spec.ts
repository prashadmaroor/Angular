import { TestBed } from '@angular/core/testing';

import { JsonserviceService } from './jsonservice.service';

describe('JsonserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonserviceService = TestBed.get(JsonserviceService);
    expect(service).toBeTruthy();
  });
});
