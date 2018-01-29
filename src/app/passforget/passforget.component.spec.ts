import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassforgetComponent } from './passforget.component';

describe('PassforgetComponent', () => {
  let component: PassforgetComponent;
  let fixture: ComponentFixture<PassforgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassforgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassforgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
