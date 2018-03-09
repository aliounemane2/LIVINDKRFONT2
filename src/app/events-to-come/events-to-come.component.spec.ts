import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsToComeComponent } from './events-to-come.component';

describe('EventsToComeComponent', () => {
  let component: EventsToComeComponent;
  let fixture: ComponentFixture<EventsToComeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsToComeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsToComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
