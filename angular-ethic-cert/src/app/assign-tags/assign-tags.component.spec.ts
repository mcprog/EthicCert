import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTagsComponent } from './assign-tags.component';

describe('AssignTagsComponent', () => {
  let component: AssignTagsComponent;
  let fixture: ComponentFixture<AssignTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
