import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {
  private url = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  storeResults(data: { userIP: any; questionScores: { [p: string]: number } }) {
    return this.http.post(this.url + '/store-results', data);
  }

  getUserIP() {
    return this.http.get('https://api.ipify.org?format=json');
  }

  getAllResults() {
    return this.http.get(this.url + '/all-results');
  }
}
