import {Component, OnInit} from '@angular/core';
import { questions } from '../../assets/questions';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent {
  questions = questions;
}
