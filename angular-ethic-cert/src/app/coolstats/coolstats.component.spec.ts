import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolstatsComponent } from './coolstats.component';

describe('CoolstatsComponent', () => {
  let component: CoolstatsComponent;
  let fixture: ComponentFixture<CoolstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoolstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
