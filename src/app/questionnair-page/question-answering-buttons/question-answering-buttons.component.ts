import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-answering-buttons',
  templateUrl: './question-answering-buttons.component.html',
  styleUrls: ['./question-answering-buttons.component.css']
})
export class QuestionAnsweringButtonsComponent {
  @Input() questionId?: number;
  @Input() questionWeight?: number;  // Input für das Gewicht der Frage
  @Output() valueChange = new EventEmitter<number>();  // Output Event Emitter

  onValueChange(value: number) {
    // Wertänderung: Multiplizieren Sie den Wert der Auswahl mit dem Gewicht der Frage
    const weight = this.questionWeight || 1;
    const weightedValue = value * weight;
    this.valueChange.emit(weightedValue);  // Emit Event mit dem gewichteten Wert
  }
}
