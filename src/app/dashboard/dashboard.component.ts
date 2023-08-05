import {Component, OnInit, Renderer2} from '@angular/core';
import {ServerCommunicationService} from "../services/server-communication.service";
import {QuestionInterface} from "../../assets/question-interface";
import {questions} from "../../assets/questions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  results: any = [];
  answers = ["Nein", "Eher Nein", "Eher Ja", "Ja"]

  constructor(private serverCommunicationService: ServerCommunicationService, private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(270deg, rgba(17, 153, 142, 0.3) 0%, rgba(56, 239, 125, 0.3) 100%)');
  }

  ngOnInit(): void {
    this.serverCommunicationService.getAllResults()
      .subscribe(
        data => this.results = data,
        error => console.error(error)
      );
  }

  getProperty(object: any, propertyName: string, subProperty?: string) {
    try {
      if (subProperty) {
        const questionId = Number(subProperty); // Convert the subProperty to a number
        const question = this.getQuestionById(questionId);
        const answerId = object[propertyName][subProperty] / question!.weight;
        if (question) {
          return this.answers[answerId];
        } else {
          return '';
        }
      }
      return object[propertyName];
    } catch (error) {
      return ''; // Default value if the property or subproperty is not found
    }
  }

  getQuestionById(id: number): QuestionInterface | null {
    const question = questions.find(q => q.id === id);
    return question || null;
  }
}
