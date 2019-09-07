import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty } from "rxjs";
import { FetchAthletes, AthleteActionTypes, SetAthletes } from '../actions/athlete.actions';
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
  fetchAthletes$ = this.actions$.pipe(
    ofType<FetchAthletes>(AthleteActionTypes.FETCH_ATHLETES),
    map( (action: FetchAthletes) => action.payload),
    switchMap( (coachId: number) => this.athleteService.fetchAthletes(coachId) ),
    tap( (athletes: Athlete[]) => new SetAthletes(athletes) ),
    catchError( (err: any) => {
      console.log(err);
      return empty();
    })
  );
}
