import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { tokenSelector } from '../store/selectors/auth.selectors';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private store: Store<State>) {
    this.store.pipe(
      select(tokenSelector)
    ).subscribe( (token: string) => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.token) {
      authReq = req.clone({
        headers: req.headers.set('authorization', 'Bearer ' + this.token)
      });
    }

    return next.handle(authReq).pipe(
      map((event:HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({body: this.parseResponse(event.body)});
        }
      })
    );
  }

  private parseResponse(eventBody): any {
    if (eventBody && eventBody._embedded) {
      const key = Object.keys(eventBody._embedded);
      return eventBody._embedded[key[0]];
    } else {
      return eventBody;
    }
  }
}
