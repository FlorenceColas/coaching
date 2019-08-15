import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store';
import { isLoggedinSelector } from '../../store/selectors/auth.selectors';
import { Logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public weekNumber: string;
  public isLoggedin$: Observable<boolean>;

  constructor(
    @Inject(LOCALE_ID) protected localeId: string,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.isLoggedin$ = this.store.pipe(select(isLoggedinSelector));

    this.weekNumber = formatDate(
      new Date().getTime(), 
      'ww', 
      this.localeId
    );;
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
