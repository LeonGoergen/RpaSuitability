import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {
    if (!this.getSessionToken()) {
      this.generateSessionToken();
    }
  }

  private generateSessionToken(): void {
    const sessionToken = uuidV4();
    localStorage.setItem('sessionToken', sessionToken);
  }

  public getSessionToken(): string | null {
    return localStorage.getItem('sessionToken');
  }
}
