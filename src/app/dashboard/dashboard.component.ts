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
  properties: any = [];
  messages: any = [];
  data: number[] = [];
  userIdMap = new Map();
  answers = ["Nein", "Eher Nein", "Eher Ja", "Ja"]

  constructor(private serverCommunicationService: ServerCommunicationService,
              private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(270deg, rgba(17, 153, 142, 0.3) 0%, rgba(56, 239, 125, 0.3) 100%)');
  }

  ngOnInit(): void {
    this.serverCommunicationService.getAllResults()
      .subscribe(
        data => {
          this.properties = data;
          this.createUserIdMap();
        },
        error => console.error(error)
      );

    this.serverCommunicationService.getAllMessages()
      .subscribe(
        data => {
          console.log(data)
          this.messages = data;
        },
        error => console.error(error)
      );
  }

  getTotalEntries() {
    return this.properties.length;
  }

  createUserIdMap() {
    let id = 1;

    for (let property of this.properties) {
      let userToken = this.getProperty(property, 'userToken');
      if (!this.userIdMap.has(userToken)) {
        this.userIdMap.set(userToken, id.toString());
        id++;
      } else if (userToken === 'undefined') {
        this.userIdMap.set(userToken, 'NaN');
      }
    }
  }

  getProperty(object: any, propertyName: string, subProperty?: string) {
    try {
      if (subProperty) {
          return object[propertyName][subProperty];
      }
      return object[propertyName];
    } catch (error) {
      return '';
    }
  }

  getAnswer(object: any, subProperty: string) {
    let answerScore = this.getProperty(object, 'questionScores', subProperty)
    const questionId = Number(subProperty); // Convert the subProperty to a number
    const question = this.getQuestionById(questionId);
    const answerId = answerScore / question!.weight;
    return this.answers[answerId];
  }

  getQuestionById(id: number): QuestionInterface | null {
    const question = questions.find(q => q.id === id);
    return question ?? null;
  }

  protected readonly String = String;
  protected readonly questions = questions;
}
