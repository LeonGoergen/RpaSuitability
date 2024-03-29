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
import { HttpClientModule } from '@angular/common/http';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ChartComponent } from './dashboard/chart/chart.component';
import { QuestionTableComponent } from './dashboard/question-table/question-table.component';
import { UserTableComponent } from './dashboard/user-table/user-table.component';
import { MessageTableComponent } from './dashboard/message-table/message-table.component';
import { RatingFormComponent } from './contact-page/rating-form/rating-form.component';
import { MapComponentComponent } from './contact-page/map-component/map-component.component';
import { RatingsTableComponent } from './dashboard/ratings-table/ratings-table.component';
import { RatingsSliderComponent } from './home-page/ratings-slider/ratings-slider.component';
import { FooterComponent } from './header/footer/footer.component';
import { DatenschutzComponent } from './header/datenschutz/datenschutz.component';
import { ImpressumComponent } from './header/impressum/impressum.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
    DashboardComponent,
    ChartComponent,
    QuestionTableComponent,
    UserTableComponent,
    MessageTableComponent,
    RatingFormComponent,
    MapComponentComponent,
    RatingsTableComponent,
    RatingsSliderComponent,
    FooterComponent,
    DatenschutzComponent,
    ImpressumComponent,
  ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      MatDialogModule,
      AppRoutingModule,
      NgOptimizedImage,
      MatSliderModule,
      HttpClientModule,
      MatSnackBarModule,
      BrowserAnimationsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
