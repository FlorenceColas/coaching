import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty } from "rxjs";
import { TryFetchAthletes, AthleteActionTypes, SetAthletes } from '../actions/athlete.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Athlete } from '../reducers/athlete.reducer';
import { AthleteService } from '../../services/athlete.service';


@Injectable()
export class AthleteEffets {
  constructor(
    private actions$: Actions,
    private athleteService: AthleteService
  ) {}

  @Effect()
  tryFetchAthletes$ = this.actions$.pipe(
    ofType<TryFetchAthletes>(AthleteActionTypes.TRY_FETCH_ATHLETES),
    map( (action: TryFetchAthletes) => action.payload),
    switchMap( (coachId: number) => this.athleteService.tryFetchAthletes(coachId) ),
    tap( (athletes: Athlete[]) => new SetAthletes(athletes) ),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );
}
