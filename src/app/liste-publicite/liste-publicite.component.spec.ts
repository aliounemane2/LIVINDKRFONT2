import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePubliciteComponent } from './liste-publicite.component';

describe('ListePubliciteComponent', () => {
  let component: ListePubliciteComponent;
  let fixture: ComponentFixture<ListePubliciteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePubliciteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePubliciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
