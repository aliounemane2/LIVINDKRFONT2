/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EvenementService } from './evenement.service';

describe('EvenementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvenementService]
    });
  });

  it('should ...', inject([EvenementService], (service: EvenementService) => {
    expect(service).toBeTruthy();
  }));
});
