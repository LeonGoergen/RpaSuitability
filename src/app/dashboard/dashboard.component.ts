import {Component, OnInit, Renderer2} from '@angular/core';
import {ServerCommunicationService} from "../services/server-communication.service";
import {QuestionInterface} from "../../assets/question-interface";
import {questions} from "../../assets/questions";
import {Chart, ChartConfiguration, registerables} from "chart.js";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  properties: any = [];
  answers = ["Nein", "Eher Nein", "Eher Ja", "Ja"]
  questionsId = Array.from({length: 13}, (_, i) => i + 1);
  data: number[] = [];
  userIdMap = new Map();
  selectedTimeRange: number = 0.0416666667;
  chart: Chart | null = null;
  questions: QuestionInterface[] = questions;

  constructor(private serverCommunicationService: ServerCommunicationService,
              private renderer: Renderer2,
              private cdRef: ChangeDetectorRef) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(270deg, rgba(17, 153, 142, 0.3) 0%, rgba(56, 239, 125, 0.3) 100%)');
  }

  ngOnInit(): void {
    this.serverCommunicationService.getAllResults()
      .subscribe(
        data => {
          this.properties = data;
          this.createUserIdMap();
          this.createChartWithData();
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
      let ipAddress = this.getProperty(property, 'userIP');
      if (!this.userIdMap.has(ipAddress)) {
        this.userIdMap.set(ipAddress, id.toString());
        id++;
      } else if (ipAddress === 'undefined') {
        this.userIdMap.set(ipAddress, 'NaN');
      }
    }
  }

  getUserId(ipAddress: string) {
    if (!this.userIdMap.has(ipAddress)) {
      return '0';
    }

    return this.userIdMap.get(ipAddress);
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

  onTimeRangeChange(event: any): void {
    this.selectedTimeRange = Number(event.target.value);
    this.createChartWithData();
    this.cdRef.detectChanges();
  }

  createChartWithData() {
    const now = new Date();
    const dataByDate = this.properties.reduce((accum: any, curr: any) => {
      const date = new Date(curr.timestamp);

      if (isNaN(date.getTime())) {
        return accum;
      }

      // Only include data within the selected range
      const diffInDays = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffInDays > this.selectedTimeRange) {
        return accum;
      }

      const key = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

      if (!accum[key]) {
        accum[key] = 0;
      }

      accum[key]++;
      return accum;
    }, {});

    const labels = Object.keys(dataByDate).sort();
    const data = labels.map(label => dataByDate[label]);

    this.createChart(labels, data);
  }

  createChart(labels: string[], data: number[]) {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx === null) {
      // Handle the error here
      console.error('Could not get the context of the canvas');
      return;
    }

    if(this.chart) {  // If chart instance already exists
      this.chart.destroy();  // Destroy the existing chart
    }

    Chart.register(...registerables);
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Anzahl der Einträge',
          data: data,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#000',
              font: {
                size: 14,
              },
            },
          },
          y: {
            grid: {
              color: '#ddd',
              borderDash: [5, 5]
            },
            ticks: {
              color: '#000',
              font: {
                size: 14,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#000',
              font: {
                size: 18,
              },
            },
          },
        },
      }
    } as ChartConfiguration);
  }

  getProperty(object: any, propertyName: string, subProperty?: string) {
    try {
      if (subProperty) {
          return object[propertyName][subProperty];
      }
      return object[propertyName];
    } catch (error) {
      return ''; // Default value if the property or subproperty is not found
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
    return question || null;
  }

  calculateAnswerCount(questionId: number, answer: string) {
    let total = 0;
    let answerCount = 0;

    for (let property in this.properties) {
      let actualAnswer = this.getAnswer(this.properties[property], String(questionId));
      if (answer === actualAnswer) {
        answerCount++;
      }
      total++;
    }

    return {
      answerCount: answerCount,
      answerPercentage: Math.round(answerCount / total * 100)
    }
  }

  protected readonly String = String;
}
