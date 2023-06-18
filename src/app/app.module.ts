import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnair-page/questionnaire/questionnaire.component';
import { HeaderComponent } from './header/header.component';
import { QuestionAnsweringButtonsComponent } from './questionnair-page/question-answering-buttons/question-answering-buttons.component';
import { ResultsComponent } from "./questionnair-page/results/results.component";
import { AppRoutingModule } from './routing/app-routing.module';
import { HomeComponent } from './home-page/home.component';
import { ContactComponent } from './contact-page/contact.component';
import {NgOptimizedImage} from "@angular/common";
import { ContactFormComponent } from './contact-page/contact-form/contact-form.component';
import {MatSliderModule} from "@angular/material/slider";
import { ContentSliderComponent } from './home-page/content-slider/content-slider.component';
import {AboutUsComponent} from "./contact-page/about-us/about-us.component";

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    HeaderComponent,
    QuestionAnsweringButtonsComponent,
    ResultsComponent,
    HomeComponent,
    ContactComponent,
    ContactFormComponent,
    ContentSliderComponent,
    AboutUsComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        AppRoutingModule,
        NgOptimizedImage,
        MatSliderModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
