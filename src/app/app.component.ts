import { Component, LOCALE_ID, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { State } from './shared/store';
import { TryRefreskToken } from './shared/store/actions/auth.actions';
import { SetCurrentWeek, SetWeekDetails } from './shared/store/actions/week.actions';
import { Week } from './shared/store/reducers/week.reducer';
import { DateTools } from './shared/classes/date-tools.classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private store: Store<State>,
    @Inject(LOCALE_ID) protected localeId: string,
  ) {
    this.store.dispatch(new TryRefreskToken());

    const week: number = moment(new Date().getTime()).isoWeek();
    const year: number = moment(new Date().getTime()).year();

    this.store.dispatch(new SetCurrentWeek({ week: week.toString(), year: year.toString() }));

    var selectedDate = moment().day("Tuesday").year(year).week(week);
    var weekStart = selectedDate.clone().startOf('isoWeek').format('x');
    var weekEnd = selectedDate.clone().endOf('isoWeek').format('x');

    const weekDetails: Week = {
      nextWeek: DateTools.getNextWeek(week.toString(), year.toString()),
      number: week.toString(),
      previousWeek: DateTools.getPreviousWeek(week.toString(), year.toString()),
      rangeFrom: weekStart,
      rangeTo: weekEnd,
      year: year.toString()
    };
    this.store.dispatch(new SetWeekDetails(weekDetails));
  }
}
