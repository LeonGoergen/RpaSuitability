import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home-page/home.component'; // import your HomeComponent
import { QuestionnaireComponent } from '../questionnair-page/questionnaire/questionnaire.component'; // import your QuestionnaireComponent
import { ContactComponent } from '../contact-page/contact.component'; // import your ContactComponent
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ImpressumComponent} from "../header/impressum/impressum.component";
import {DatenschutzComponent} from "../header/datenschutz/datenschutz.component"; // import your DatabaseComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'contact-page', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '**', redirectTo: '' } // redirect to `HomeComponent` if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
