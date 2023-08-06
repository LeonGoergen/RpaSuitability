import { Component, Input } from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {questions} from "../../../assets/questions";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  questions = questions;
  @Input() properties: any = [];
  @Input() userIdMap = new Map();
  questionsId = Array.from({length: 13}, (_, i) => i + 1);

  constructor(private dashboardComponent: DashboardComponent) {}

  getProperty(obj: any, key: string, subKey?: string): any {
    return this.dashboardComponent.getProperty(obj, key, subKey);
  }

  getAnswer(object: any, subProperty: string) {
    return this.dashboardComponent.getAnswer(object, subProperty);
  }

  getScore(object: any) {
    const totalPossibleScore = this.questions.reduce((total, question) => total + question.weight * 3, 0);

    let score = 0;
    for (let i = 1; i <= 13; i++) {
      let answer = this.getProperty(object, 'questionScores', String(i))
      score += answer;
    }
    return Math.round(score / totalPossibleScore * 100);
  }

  getUserId(ipAddress: string) {
    if (!this.userIdMap.has(ipAddress)) {
      return '0';
    }

    return this.userIdMap.get(ipAddress);
  }

  protected readonly String = String;
}