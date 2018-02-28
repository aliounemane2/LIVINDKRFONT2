import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePubliciteComponent } from './delete-publicite.component';

describe('DeletePubliciteComponent', () => {
  let component: DeletePubliciteComponent;
  let fixture: ComponentFixture<DeletePubliciteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePubliciteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePubliciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
