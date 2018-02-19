import { TestBed, inject } from '@angular/core/testing';

import { ChatWebsocketService } from './chat-websocket.service';

describe('ChatWebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatWebsocketService]
    });
  });

  it('should be created', inject([ChatWebsocketService], (service: ChatWebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
