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
  visibleQuestions: number[] = this.questions.map(question => question.id);
  questionScores: { [id: string]: number } = {};
  openQuestions: number[] = [];
  @ViewChildren(QuestionAnsweringButtonsComponent) buttonsComponents!: QueryList<QuestionAnsweringButtonsComponent>;
  showResults: boolean = false; // Track the visibility of the Results component

  constructor(private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)');
  }

// Update the onValueChange() method in questionnaire.component.ts
  onValueChange(event: { questionId: number, weightedValue: number }) {
    const { questionId, weightedValue } = event;
    this.questionScores[questionId] = weightedValue;

    if (weightedValue === 0) {
      // If the user answers "Nein" to a question, remove the dependent questions from the visibleQuestions array
      this.removeDependentQuestions(questionId);
    } else {
      // If the user answers "Ja" to a question, add the dependent questions back to the visibleQuestions array
      this.addDependentQuestions(questionId);
    }

    this.questionScores[questionId] = weightedValue;

    // Recursively set dependent questions to a weighted value of 0 if the parent question is answered with "Nein"
    if (weightedValue === 0) {
      this.setDependentQuestionsToZero(questionId);
    }

    this.logQuestionnaireStats();

    if (this.areAllQuestionsAnswered()) {
      this.showResults = true; // Show the Results component when all questions are answered
    }
  }

// Add a helper method to recursively set dependent questions to a weighted value of 0
  setDependentQuestionsToZero(questionId: number) {
    const dependentQuestions = this.questions.filter(q => q.dependsOn === questionId);
    dependentQuestions.forEach(dependentQuestion => {
      this.questionScores[dependentQuestion.id] = 0;
      this.setDependentQuestionsToZero(dependentQuestion.id); // Recursively set dependent questions of the dependent question
    });
  }

  getDependentQuestionIds(questionId: number): number[] {
    const dependentQuestions = this.questions.filter(q => q.dependsOn === questionId);
    return dependentQuestions.map(q => q.id);
  }

  logQuestionnaireStats() {
    const answeredQuestions = Object.keys(this.questionScores).length;
    const totalQuestions = this.questions.length;
    const currentScore = Object.values(this.questionScores).reduce((a, b) => a + b, 0);
    const currentPossibleScore = Object.values(this.questionScores).reduce((total, value) => {
      const questionId = Object.keys(this.questionScores).find(k => this.questionScores[k] === value);
      const question = questionId ? this.questions.find(q => q.id === parseInt(questionId)) : undefined;
      if (question) {
        return total + (question.weight * 3);
      }
      return total;
    }, 0);
    const currentPossibleScorePercentage = currentPossibleScore === 0 ? 0 : (currentScore / currentPossibleScore) * 100;
    const answeredPercentage = (answeredQuestions / totalQuestions) * 100;

    console.log(
      `Current Score:\t\t\t\t\t\t\t${currentScore}\n` +
      `Current Possible Score:\t\t\t\t\t${currentPossibleScore}\n` +
      `Percentage of Current Possible Score:\t${currentPossibleScorePercentage.toFixed(2)}%\n\n` +
      `Number of Questions Answered:\t\t\t${answeredQuestions}\n` +
      `Total Questions:\t\t\t\t\t\t${totalQuestions}\n` +
      `Percentage of Questions Answered:\t\t${answeredPercentage.toFixed(2)}%`
    );
  }

  removeDependentQuestions(questionId: number) {
    const dependentQuestions = this.getDependentQuestionIds(questionId);
    dependentQuestions.forEach(dependentQuestion => {
      const index = this.visibleQuestions.indexOf(dependentQuestion);
      if (index !== -1) {
        this.visibleQuestions.splice(index, 1);
        this.removeDependentQuestions(dependentQuestion); // Recursively remove dependent questions of the dependent question
      }
    });
  }

  addDependentQuestions(questionId: number) {
    const dependentQuestions = this.getDependentQuestionIds(questionId);
    dependentQuestions.forEach(dependentQuestion => {
      if (!this.visibleQuestions.includes(dependentQuestion)) {
        const component = this.buttonsComponents.find(comp => comp.questionId === dependentQuestion);
        if (component) {
          component.selectedValue = null;
        }
        delete this.questionScores[dependentQuestion];
        this.visibleQuestions.push(dependentQuestion);
        this.addDependentQuestions(dependentQuestion); // Recursively add dependent questions of the dependent question
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.areAllQuestionsAnswered()) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  areAllQuestionsAnswered(): boolean {
    const answeredQuestions = Object.keys(this.questionScores).map(Number);
    const allQuestions = this.questions.map(question => question.id);
    return allQuestions.every(questionId => answeredQuestions.includes(questionId));
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
    this.questionScores = {};
    this.openQuestions = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.buttonsComponents.forEach(component => component.reset());

    this.showResults = false; // Reset the visibility of the Results component
  }
}
