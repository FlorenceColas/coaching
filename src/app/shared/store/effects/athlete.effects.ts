import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty, of } from "rxjs";
import { TryFetchAthletes, AthleteActionTypes, SetAthletes, TrySetCurrentAthlete, SetCurrentAthlete } from '../actions/athlete.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Athlete } from '../reducers/athlete.reducer';
import { AthleteService } from '../../services/athlete.service';
import { Store, select } from '@ngrx/store';
import { State } from '..';
import { tokenSelector, currentUserSelector } from '../selectors/auth.selectors';
import { FetchWeekActivities } from '../actions/week.actions';
import { currentWeekSelector } from '../selectors/week.selectors';
import { allAthletesSelector } from '../selectors/athlete.selectors';

@Injectable()
export class AthleteEffets {
  constructor(
    private actions$: Actions,
    private athleteService: AthleteService,
    private store: Store<State>
  ) {}

  @Effect()
  setAthletes$ = this.actions$.pipe(
    ofType<SetAthletes>(AthleteActionTypes.SET_ATHLETES),
    withLatestFrom(this.store.pipe(select(currentUserSelector))),
    switchMap( ([action, user]) => [
      new TrySetCurrentAthlete(user.id),
    ])
  ); 

  @Effect()
  setCurrentAthletes$ = this.actions$.pipe(
    ofType<SetCurrentAthlete>(AthleteActionTypes.SET_CURRENT_ATHLETE),
    withLatestFrom(this.store.pipe(select(currentWeekSelector))),
    switchMap( ([action, week]) => [
      new FetchWeekActivities({'week': week.week, 'year': week.year}) 
    ])
  ); 

  @Effect()
  tryFetchAthletes$ = this.actions$.pipe(
    ofType<TryFetchAthletes>(AthleteActionTypes.TRY_FETCH_ATHLETES),
    withLatestFrom(this.store.pipe(select(tokenSelector))),
    switchMap( () => this.athleteService.tryFetchAthletes() ),
    map( (athletes: Athlete[], index: number) => new SetAthletes(athletes) ),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );

  @Effect()
  trySetCurrentAthlete$ = this.actions$.pipe(
    ofType<TrySetCurrentAthlete>(AthleteActionTypes.TRY_SET_CURRENT_ATHLETE),
    withLatestFrom(this.store.pipe(select(allAthletesSelector)), this.store.pipe(select(currentWeekSelector))),
    switchMap( ([action, athletes, week]) => {
      for(var key in athletes) {
        if (athletes[key].id == action.payload) {
          return of(new SetCurrentAthlete(athletes[key]));
        }
      }
    }),
  );

}
