import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Athlete } from '../store/reducers/athlete.reducer';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  private uri: string = 'http://coaching-back.localhost';

  constructor(private http: HttpClient) {}

  public tryFetchAthletes(coachId: number): Observable<Athlete[]> {
    return this.http.get<Athlete[]>(this.uri + '/api/rest/v1/athletes/' + coachId);
  }
}