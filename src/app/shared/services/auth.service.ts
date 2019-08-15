import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { JwtToken } from '../models/jwt-token.model';
import { State } from '../store';
import { TryRefreskToken } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri: string = 'http://coaching-back.localhost';
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    })
  };
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    jwt: null,
  });

  constructor(
      private http: HttpClient,
      private router: Router,
      private store: Store<State>
  ) {
    //this.initToken();
  }

  public initTimer()  {
    return timer(200000, 300000).pipe(
        tap( () => {
        this.store.dispatch(new TryRefreskToken());
      })
    );
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        jwt: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        jwt: null
      });
    }
  }

  public refreshToken() {
    return this.http.get<string>(this.uri + '/api/rest/v1/refresh-token');
  }

  public signIn(credentials: { username: string, password: string }): Observable<string> {
    const data = new HttpParams({fromObject: credentials});
    return this.http.post<string>(this.uri + '/api/rest/v1/signin', data, this.httpOptions);
  }
}
