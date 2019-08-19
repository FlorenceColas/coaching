import { Component, OnInit, OnDestroy, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { State } from 'src/app/shared/store';
import { RouterStateUrl } from 'src/app/shared/store/helpers/router.helper';
import { routerStateSelector } from 'src/app/shared/store/selectors/router.selectors';
import { Week, Activity } from 'src/app/shared/store/reducers/week.reducer';
import { weekDetailsSelector, weekDaysSelector } from 'src/app/shared/store/selectors/week.selectors';
import { FetchWeekActivities, SetWeekDetails, SetCurrentWeek } from 'src/app/shared/store/actions/week.actions';
import { DateTools } from 'src/app/shared/classes/date-tools.classes';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit, OnDestroy {
  public weekNumber: string;
  public year: string;
  public week$: Observable<Week>;
  public weekActivities$: Observable<{ day: { day: number, date: number }, activities: Activity[] }[]>;
  private subscription: Subscription;

  constructor(
    private router: Router,
    @Inject(LOCALE_ID) protected localeId: string,
    private store: Store<State>
  ) { }
  
  ngOnInit() {
    this.subscription = this.store.pipe(select(routerStateSelector)).subscribe( (routerStateUrl: RouterStateUrl) => {
      this.weekNumber = routerStateUrl.params.week;
      this.year = routerStateUrl.params.year;
    });

    this.week$ = this.store.pipe(select(weekDetailsSelector));

    this.store.dispatch(new FetchWeekActivities({ week: this.weekNumber, year: this.year }));

    this.weekActivities$ = this.store.pipe(select(weekDaysSelector));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToWeek(w: { week: string, year: string }) {
    var selectedDate = moment().day("Tuesday").year(parseInt(w.year)).week(parseInt(w.week));
    var weekStart = selectedDate.clone().startOf('isoWeek').format('x');
    var weekEnd = selectedDate.clone().endOf('isoWeek').format('x');

    const weekDetails: Week = {
      nextWeek: DateTools.getNextWeek(w.week, w.year),
      number: w.week,
      previousWeek: DateTools.getPreviousWeek(w.week, w.year),
      rangeFrom: weekStart,
      rangeTo: weekEnd,
      year: w.year
    };

    this.store.dispatch(new SetCurrentWeek(w));
    this.store.dispatch(new SetWeekDetails(weekDetails));
    this.store.dispatch(new FetchWeekActivities(w));

    this.router.navigate(['/week', w.week, w.year]);
  }
}
