import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { HeaderComponent } from './header/header.component';
import { QuestionAnsweringButtonsComponent } from './question-answering-buttons/question-answering-buttons.component';
import { ResultsComponent } from "./results/results.component";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
    declarations: [
        AppComponent,
        QuestionnaireComponent,
        HeaderComponent,
        QuestionAnsweringButtonsComponent,
        ResultsComponent,
        HomeComponent,
        ContactComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
