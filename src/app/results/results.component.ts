import { Component, Input, OnChanges } from '@angular/core';
import {QuestionInterface} from "../../assets/question-interface";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() totalScore?: { [id: string]: number };
  @Input() questions?:  QuestionInterface[];

  resultPercentage: number = 0;

  ngOnChanges() {
    if (this.totalScore && this.questions) {
      const totalScore = Object.values(this.totalScore).reduce((a, b) => a + b, 0);
      const totalPossibleScore = this.questions.reduce((total, question) => total + question.weight * 4, 0);
      this.resultPercentage = (totalScore / totalPossibleScore) * 100;
    }
  }
}
