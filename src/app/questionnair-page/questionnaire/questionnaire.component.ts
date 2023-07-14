import { Component, AfterViewChecked, Renderer2, QueryList, ViewChildren } from '@angular/core';
import { questions } from '../../../assets/questions';
import { QuestionAnsweringButtonsComponent } from '../question-answering-buttons/question-answering-buttons.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements AfterViewChecked {
  questions = questions;
  totalScore: { [id: string]: number } = {};
  openQuestions: number[] = [];
  @ViewChildren(QuestionAnsweringButtonsComponent) buttonsComponents!: QueryList<QuestionAnsweringButtonsComponent>;
  showResults: boolean = false; // Track the visibility of the Results component

  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)');
  }

// Update the onValueChange() method in questionnaire.component.ts
  onValueChange(weightedValue: number, questionId: number) {
    this.totalScore[questionId] = weightedValue;

    // Recursively set dependent questions to a weighted value of 0 if the parent question is answered with "Nein"
    if (weightedValue === 0) {
      this.setDependentQuestionsToZero(questionId);
    }

    const total = Object.values(this.totalScore).reduce((a, b) => a + b, 0);
    console.log('Total score:', total);

    if (this.areAllQuestionsAnswered()) {
      this.showResults = true; // Show the Results component when all questions are answered
    }
  }

// Add a helper method to recursively set dependent questions to a weighted value of 0
  setDependentQuestionsToZero(questionId: number) {
    const dependentQuestions = this.questions.filter(q => q.dependsOn === questionId);
    dependentQuestions.forEach(dependentQuestion => {
      this.totalScore[dependentQuestion.id] = 0;
      this.setDependentQuestionsToZero(dependentQuestion.id); // Recursively set dependent questions of the dependent question
    });
  }

  ngAfterViewChecked(): void {
    if (this.areAllQuestionsAnswered()) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  areAllQuestionsAnswered(): boolean {
    return Object.keys(this.totalScore).length === this.questions.length;
  }

  openExplanation(questionId: number) {
    const index = this.openQuestions.indexOf(questionId);
    if (index > -1) {
      this.openQuestions.splice(index, 1);
    } else {
      this.openQuestions.push(questionId);
    }
  }

  resetQuestionnaire() {
    this.totalScore = {};
    this.openQuestions = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.buttonsComponents.forEach(component => component.reset());

    this.showResults = false; // Reset the visibility of the Results component
  }
}
