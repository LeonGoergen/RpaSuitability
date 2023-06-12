import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnsweringButtonsComponent } from './question-answering-buttons.component';

describe('QuestionAnsweringButtonsComponent', () => {
  let component: QuestionAnsweringButtonsComponent;
  let fixture: ComponentFixture<QuestionAnsweringButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnsweringButtonsComponent]
    });
    fixture = TestBed.createComponent(QuestionAnsweringButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
