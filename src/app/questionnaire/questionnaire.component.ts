import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  currentQuestionIndex: number = 0;
  score: number = 0;

  // Define an array of questions
  questions: { question: string, explanation: string, weight: number}[] = [
    {
      question: 'Sind in Ihrem Unternehmen wiederkehrende regelbasierte Prozesse vorhanden?',
      explanation: 'Dies ist eine Erklärung zur ersten Frage',
      weight: 5,
    },
    {
      question: 'Handelt es sich dabei um einen standardisierten Prozessablauf?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 5,
    },
    {
      question: 'Werden für den Prozess webbasierte Anwendungen oder Systeme/Programme genutzt, die häufig aktualisiert und somit verändert werden?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 4,
    },
    {
      question: 'Sind diese Prozesse sehr fehleranfällig?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 4,
    },
    {
      question: 'Wie oft wird der Prozess pro Woche durchgeführt?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 3,
    },
    {
      question: 'Sind diese Daten leicht zugänglich?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 3,
    },
    {
      question: 'Unterliegen die bei dem zu automatisierenden Prozess genutzten Daten einem hohen Sicherheitsrisiko?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 3,
    },
    {
      question: 'Haben diese Prozesse viele spezielle Ausnahmen oder sind besonders komplex?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 3,
    },
    {
      question: 'Liegt bei dem Prozess ein hohes zu verarbeitendes Daten- oder Prozessvolumen vor?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 3,
    },
    {
      question: 'Handelt es sich bei den beim Prozess zu verarbeitenden Daten um strukturierte Daten? ',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 2,
    },
    {
      question: 'Existieren für den Prozessablauf bestimmte Compliance Anforderungen?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 2,
    },
    {
      question: 'Wie viele Mitarbeiter sind an dem gewünschten zu automatisierenden Prozess beteiligt?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 1,
    },
    {
      question: 'Nutzen sie bereits andere Automatisierungstechnologien?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 1,
    },
    {
      question: 'Wie viele Mitarbeiter sind an dem gewünschten zu automatisierenden Prozess beteiligt?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 1,
    },
    {
      question: 'Liegt für den zu automatisierenden Prozessablauf bereits eine Prozessdokumentation vor?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 1,
    },
    {
      question: 'Erfordert der Prozess Mehrsprachigkeit?',
      explanation: 'Dies ist eine Erklärung zur zweiten Frage',
      weight: 1,
    }
  ];

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  constructor(private fb: FormBuilder) {
    this.questionnaireForm = this.fb.group({
      answer: [0]
    });
  }

  ngOnInit() {}

  onPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onNext() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
    this.score += this.questionnaireForm.value.answer;
    this.questionnaireForm.reset();
  }
}
