import { TestBed } from '@angular/core/testing';

import { TutorContactService } from './tutor-contact.service';

describe('TutorContactService', () => {
  let service: TutorContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
