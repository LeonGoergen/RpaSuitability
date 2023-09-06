import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {
  private url = 'https://rpa-backend-gamma.vercel.app';
  //private url = 'http://localhost:9002';

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  storeResults(scores: { [p: string]: number }) {
    const sessionToken = this.sessionService.getSessionToken();
    const data = { userToken: sessionToken, questionScores: scores }
    return this.http.post(this.url + '/store-results', data);
  }

  getAllResults() {
    return this.http.get(this.url + '/all-results');
  }

  deleteResult(id: string) {
    const data = { id: id }
    return this.http.put(this.url + '/delete-result', data);
  }

  storeMessage(name: string, email: string, message: string) {
    const sessionToken = this.sessionService.getSessionToken();
    const data = { userToken: sessionToken, name: name, email: email, message: message }
    return this.http.post(this.url + '/store-message', data);
  }

  getAllMessages() {
    return this.http.get(this.url + '/all-messages');
  }

  deleteMessage(id: string) {
    const data = { id: id }
    return this.http.put(this.url + '/delete-message', data);
  }

  storeRating(title: string, rating: number, message: string) {
    const sessionToken = this.sessionService.getSessionToken();
    const data = { userToken: sessionToken, title: title, rating: rating, message: message }
    return this.http.post(this.url + '/store-rating', data);
  }

  getAllRatings() {
    return this.http.get(this.url + '/all-ratings');
  }

  deleteRating(id: string) {
    const data = { id: id }
    return this.http.put(this.url + '/delete-rating', data);
  }
}
