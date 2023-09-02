import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {
  private url = 'https://rpa-backend-gamma.vercel.app';
  //private url = 'http://localhost:9001';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  storeResults(scores: { [p: string]: number }) {
    const sessionToken = this.sessionService.getSessionToken();
    const data = { userToken: sessionToken, questionScores: scores }
    return this.http.post(this.url + '/store-results', data);
  }

  getAllResults() {
    return this.http.get(this.url + '/all-results');
  }
}
