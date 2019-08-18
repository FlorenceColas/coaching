import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store';
import { isLoggedinSelector } from '../../store/selectors/auth.selectors';
import { Logout } from '../../store/actions/auth.actions';
import { currentWeekNumberSelector, currentWeekYearSelector } from '../../store/selectors/week.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentWeekNumber$: Observable<string>;
  public currentWeekYear$: Observable<string>;
  public isLoggedin$: Observable<boolean>;

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.currentWeekNumber$ = this.store.pipe(select(currentWeekNumberSelector));
    this.currentWeekYear$ = this.store.pipe(select(currentWeekYearSelector));
    this.isLoggedin$ = this.store.pipe(select(isLoggedinSelector));
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
