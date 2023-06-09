import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  //store username in sessionStorage
  signin(value: any): any {
    sessionStorage.setItem('user', value);
  }

  logout() {
    sessionStorage.removeItem('user');
  }
}
