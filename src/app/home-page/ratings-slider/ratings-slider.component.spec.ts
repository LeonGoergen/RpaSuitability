import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsSliderComponent } from './ratings-slider.component';

describe('RatingsSliderComponent', () => {
  let component: RatingsSliderComponent;
  let fixture: ComponentFixture<RatingsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsSliderComponent]
    });
    fixture = TestBed.createComponent(RatingsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
