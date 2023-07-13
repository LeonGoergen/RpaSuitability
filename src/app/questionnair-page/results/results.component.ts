import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { QuestionInterface } from '../../../assets/question-interface';
import { ContentService } from '../../services/result-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnChanges {
  @Input() totalScore?: { [id: string]: number };
  @Input() questions?: QuestionInterface[];
  @Output() redo = new EventEmitter<void>();

  resultPercentage: number = 0;
  content: any;

  constructor(private contentService: ContentService) {}

  getStyle(resultPercentage: number) {
    return { '--i': resultPercentage.toFixed(0) };
  }

  ngOnChanges() {
    if (this.totalScore && this.questions) {
      const totalScore = Object.values(this.totalScore).reduce((a, b) => a + b, 0);
      const totalPossibleScore = this.questions.reduce((total, question) => total + question.weight * 3, 0);
      this.resultPercentage = (totalScore / totalPossibleScore) * 100;
      this.content = this.contentService.getContentByPercentage(this.resultPercentage);
    }
  }
}
