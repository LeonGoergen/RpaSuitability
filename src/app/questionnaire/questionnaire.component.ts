import {Component, OnInit} from '@angular/core';
import { questions } from '../../assets/questions';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  questions = questions;
  totalScore: { [id: string]: number } = {};
  currentQuestionId: number = this.questions[0]?.id;

  onValueChange(weightedValue: number, questionId: number) {
    // Update score for question
    this.totalScore[questionId] = weightedValue;

    // Calculate total score
    const total = Object.values(this.totalScore).reduce((a, b) => a + b, 0);
    console.log('Total score:', total);

    // Move to next question
    const currentIndex = this.questions.findIndex(question => question.id === questionId);
    if (currentIndex < this.questions.length - 1) {
      this.currentQuestionId = this.questions[currentIndex + 1].id;
    }

    // Close current question explanation
    this.currentQuestionId = 0;
    // Delay before moving to next question
    setTimeout(() => {
      // Move to next question
      const currentIndex = this.questions.findIndex(question => question.id === questionId);
      if (currentIndex < this.questions.length - 1) {
        this.currentQuestionId = this.questions[currentIndex + 1].id;
      }
    }, 1000);
  }

  openExplanation(questionId: number) {
    this.currentQuestionId = questionId;
  }
}
