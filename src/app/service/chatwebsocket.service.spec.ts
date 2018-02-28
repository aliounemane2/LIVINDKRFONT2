import { TestBed, inject } from '@angular/core/testing';

import { ChatwebsocketService } from './chatwebsocket.service';

describe('ChatwebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatwebsocketService]
    });
  });

  it('should be created', inject([ChatwebsocketService], (service: ChatwebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
