import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home-page/home.component'; // import your HomeComponent
import { QuestionnaireComponent } from '../questionnair-page/questionnaire/questionnaire.component'; // import your QuestionnaireComponent
import { ContactComponent } from '../contact-page/contact.component'; // import your ContactComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'contact-page', component: ContactComponent },
  { path: '**', redirectTo: '' } // redirect to `HomeComponent` if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
