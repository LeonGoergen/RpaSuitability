import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
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
  ratings: any = [];
  data: number[] = [];

  userIdMap = new Map();
  answers = ["Nein", "Eher Nein", "Eher Ja", "Ja"]

  currentSection = '';
  sections = [
    { id: 'question-table', name: 'Question Table' },
    { id: 'chart', name: 'Chart' },
    { id: 'user-table', name: 'User Table' },
    { id: 'message-table', name: 'Message Table' },
    { id: 'ratings-table', name: 'Ratings Table' }
  ];

  constructor(private serverCommunicationService: ServerCommunicationService,
              private renderer: Renderer2,
              private el: ElementRef) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(270deg, rgba(17, 153, 142, 0.3) 0%, rgba(56, 239, 125, 0.3) 100%)');
  }

  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData() {
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
          this.messages = data;
          this.createUserIdMap();
        },
        error => console.error(error)
      );

    this.serverCommunicationService.getAllRatings()
      .subscribe(
        data => {
          this.ratings = data;
          this.createUserIdMap();
        },
        error => console.error(error)
      );
  }

  scrollTo(event: any, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);

    // Calculate position to scroll to: element's top offset - half the viewport height + half the element's height
    const positionToScroll =
      element!.offsetTop - window.innerHeight / 2 + element!.clientHeight / 2;

    window.scrollTo({
      top: positionToScroll,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let currentSection = '';
    const viewportHeight = window.innerHeight;
    const middleLine = viewportHeight / 2;

    this.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      const rect = element!.getBoundingClientRect();

      if (rect.top <= middleLine && rect.bottom >= middleLine) {
        currentSection = section.id;
      }
    });

    this.currentSection = currentSection;
  }

  getTotalEntries() {
    return this.properties.length;
  }

  getAverageRating() {
    let sum = 0;
    for (let item of this.ratings) {
      sum += Number(this.getProperty(item, 'rating'));
    }
    return (sum / this.ratings.length).toFixed(2);
  }

  createUserIdMap() {
    let id = 1;

    const combinedData = [...this.properties, ...this.messages];

    for (let item of combinedData) {
      let userToken = this.getProperty(item, 'userToken');
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
