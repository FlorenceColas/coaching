import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';

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
  public subscription: Subscription;

  constructor(
      private http: HttpClient
  ) {
    this.initToken();
    this.subscription = this.initTimer();
  }

  public initTimer()  {
    return timer(300000, 300000).pipe(
        switchMap( () => {
          if (localStorage.getItem('jwt')) {
            return this.http.get<string>(this.uri + '/api/rest/v1/refresh-token').pipe(
                tap( (token: string) => {
                  this.jwtToken.next({
                    isAuthenticated: true,
                    jwt: token
                  });
                  localStorage.setItem('jwt', token);
                })
            );
          } else {
            this.subscription.unsubscribe();
            return of(null);
          }
        })
    ).subscribe( () => {}, err => {
      this.jwtToken.next({
        isAuthenticated: false,
        jwt: null
      });
      localStorage.removeItem('jwt');
      this.subscription.unsubscribe();
    });
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

  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      jwt: null
    });
    localStorage.removeItem('jwt');
  }

  public signIn(credentials: { username: string, password: string }): Observable<string> {
    const data = new HttpParams({fromObject: credentials});

    return this.http.post<string>(this.uri + '/api/rest/v1/signin', data, this.httpOptions).pipe(
        tap( (token: string) => {
          this.jwtToken.next({
            isAuthenticated: true,
            jwt: token
          });
          localStorage.setItem('jwt', token);
          this.subscription = this.initTimer();
        })
    );
  }
}
