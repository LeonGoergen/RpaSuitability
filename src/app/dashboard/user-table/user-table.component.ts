import { Component, Input } from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {questions} from "../../../assets/questions";
import {SnackbarService} from "../../services/snackbar.service";

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

  constructor(private dashboardComponent: DashboardComponent,
              private snackbarService: SnackbarService) {}

  getProperty(obj: any, key: string, subKey?: string): any {
    return this.dashboardComponent.getProperty(obj, key, subKey);
  }

  getAnswer(object: any, subProperty: string) {
    return this.dashboardComponent.getAnswer(object, subProperty);
  }

  deleteProperty(index: number, id: string) {
    if (window.confirm('Are you sure you want to delete this result?')) {
      this.properties.splice(index, 1);
      this.dashboardComponent.serverCommunicationService.deleteResult(id).subscribe(
        response => {
          this.snackbarService.onSuccess("Eintrag wurde erfolgreich gelöscht!");
        },
        error => {
          this.snackbarService.onError("Eintrag konnte nicht gelöscht werden!");
        }
      );
    } else {
      this.snackbarService.onWarning("Löschen des Eintrags wurde abgebrochen!");
    }
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

  getUserId(userToken: string) {
    if (!this.userIdMap.has(userToken)) {
      return '0';
    }

    return this.userIdMap.get(userToken);
  }

  protected readonly String = String;
}
