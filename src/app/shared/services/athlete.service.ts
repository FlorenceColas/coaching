import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Athlete } from '../store/reducers/athlete.reducer';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { User } from '../models/user.model';
import { currentUserSelector } from '../store/selectors/auth.selectors';
import { RouterStateUrl } from '../store/helpers/router.helper';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private uri: string = 'http://coaching-back.localhost';
  private user: User;
  private subscription: Subscription;
  
  constructor(
    private http: HttpClient,
    private store: Store<State>
  ) {
    this.subscription = this.store.pipe(select(currentUserSelector)).subscribe( (user: User) => {
      this.user = user;
    });
  }

  public tryFetchAthletes(): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(this.uri + '/api/rest/v1/athletes/' + this.user.id);
  }
}