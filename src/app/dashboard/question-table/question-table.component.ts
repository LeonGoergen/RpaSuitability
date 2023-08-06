import {Component, Input} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.css']
})
export class QuestionTableComponent {
  @Input() properties: any = [];
  answers = ["Nein", "Eher Nein", "Eher Ja", "Ja"]
  questionsId = Array.from({length: 13}, (_, i) => i + 1);

  constructor(private dashboardComponent: DashboardComponent) { }

  calculateAnswerCount(questionId: number, answer: string) {
    let total = 0;
    let answerCount = 0;

    for (let property in this.properties) {
      let actualAnswer = this.dashboardComponent.getAnswer(this.properties[property], String(questionId));
      if (answer === actualAnswer) {
        answerCount++;
      }
      total++;
    }

    return {
      answerCount: answerCount,
      answerPercentage: Math.round(answerCount / total * 100)
    }
  }

  getQuestionById(questionId: number) {
    return this.dashboardComponent.getQuestionById(questionId);
  }

}
