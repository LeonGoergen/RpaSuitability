import { Component, ViewChild, ElementRef } from '@angular/core';
import { questions } from '../../assets/questions';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  questions = questions;
  totalScore: { [id: string]: number } = {};
  currentQuestionId: number = 0;

  onValueChange(weightedValue: number, questionId: number) {
    // Update score for question
    this.totalScore[questionId] = weightedValue;

    // Calculate total score
    const total = Object.values(this.totalScore).reduce((a, b) => a + b, 0);
    console.log('Total score:', total);
  }

  areAllQuestionsAnswered(): boolean {
    return Object.keys(this.totalScore).length === this.questions.length;
  }

  openExplanation(questionId: number) {
    this.currentQuestionId = questionId;
  }
}
