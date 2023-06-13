import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; // import your HomeComponent
import { QuestionnaireComponent } from './questionnaire/questionnaire.component'; // import your QuestionnaireComponent
import { ContactComponent } from './contact/contact.component'; // import your ContactComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } // redirect to `HomeComponent` if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
