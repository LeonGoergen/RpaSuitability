import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { HeaderComponent } from './header/header.component';
import { QuestionAnsweringButtonsComponent } from './question-answering-buttons/question-answering-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    HeaderComponent,
    QuestionAnsweringButtonsComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
