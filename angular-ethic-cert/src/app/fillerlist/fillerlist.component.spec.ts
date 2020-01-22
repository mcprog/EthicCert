import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillerlistComponent } from './fillerlist.component';

describe('FillerlistComponent', () => {
  let component: FillerlistComponent;
  let fixture: ComponentFixture<FillerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
