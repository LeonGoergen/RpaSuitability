import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-answering-buttons',
  templateUrl: './question-answering-buttons.component.html',
  styleUrls: ['./question-answering-buttons.component.css']
})
export class QuestionAnsweringButtonsComponent {
  @Input() questionId?: number;
  @Input() questionWeight?: number;
  @Output() valueChange = new EventEmitter<{ questionId: number, weightedValue: number }>();

  selectedValue: number | null = null;

  onValueChange(value: number) {
    const weight = this.questionWeight || 1;
    const weightedValue = value * weight;
    this.selectedValue = value;
    this.valueChange.emit({ questionId: this.questionId || 0, weightedValue });
  }

  reset() {
    this.selectedValue = null;
  }
}
