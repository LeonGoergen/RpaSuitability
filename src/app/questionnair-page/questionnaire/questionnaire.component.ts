import { Component, AfterViewChecked } from '@angular/core';
import { questions } from '../../../assets/questions';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements AfterViewChecked {
  questions = questions;
  totalScore: { [id: string]: number } = {};
  openQuestions: number[] = [];  // Die Liste der offenen Fragen

  onValueChange(weightedValue: number, questionId: number) {
    // Update score for question
    this.totalScore[questionId] = weightedValue;

    // Calculate total score
    const total = Object.values(this.totalScore).reduce((a, b) => a + b, 0);
    console.log('Total score:', total);
  }

  // Um ans ende der page zu scrollen, nachdem alle fragen beantwortet wurden
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
      this.openQuestions.splice(index, 1);  // Wenn die Frage bereits offen ist, schließen Sie sie
    } else {
      this.openQuestions.push(questionId);  // Wenn die Frage geschlossen ist, öffnen Sie sie
    }
  }
}
