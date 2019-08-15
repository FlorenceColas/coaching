import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

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

  constructor(
      private http: HttpClient,
      private store: Store<State>
  ) {}

  public initTimer()  {
    return timer(200000, 300000).pipe(
        tap( () => {
        this.store.dispatch(new TryRefreskToken());
      })
    );
  }

  public refreshToken() {
    return this.http.get<string>(this.uri + '/api/rest/v1/refresh-token');
  }

  public signIn(credentials: { username: string, password: string }): Observable<string> {
    const data = new HttpParams({fromObject: credentials});
    return this.http.post<string>(this.uri + '/api/rest/v1/signin', data, this.httpOptions);
  }
}
