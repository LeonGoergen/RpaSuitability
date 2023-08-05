import {Component, OnInit} from '@angular/core';
import {ServerCommunicationService} from "../services/server-communication.service";
import {questions} from "../../assets/questions";
import {QuestionInterface} from "../../assets/question-interface";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  results: any = [];
  answers = ["Nein", "Eher Nein", "Eher Ja", "Ja"]

  constructor(private serverCommunicationService: ServerCommunicationService) { }

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
