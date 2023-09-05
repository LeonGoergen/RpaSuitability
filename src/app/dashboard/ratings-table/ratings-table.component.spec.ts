import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsTableComponent } from './ratings-table.component';

describe('RatingsTableComponent', () => {
  let component: RatingsTableComponent;
  let fixture: ComponentFixture<RatingsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsTableComponent]
    });
    fixture = TestBed.createComponent(RatingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
