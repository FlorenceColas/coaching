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
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';
import { DayDialogComponent } from './shared/components/day-dialog/day-dialog.component';
import { AthleteState } from 'src/app/shared/store/reducers/athlete.reducer';
import { TryFetchAthletes } from 'src/app/shared/store/actions/athlete.actions';
import { currentUserSelector } from 'src/app/shared/store/selectors/auth.selectors';
import { User } from 'src/app/shared/models/user.model';
import { TryFetchCurrentUser } from 'src/app/shared/store/actions/auth.actions';

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
  public atheletes: Observable<AthleteState>;
  private userId: number;

  constructor(
    private router: Router,
    @Inject(LOCALE_ID) protected localeId: string,
    private store: Store<State>,
    private dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.subscription = this.store.pipe(select(routerStateSelector)).subscribe( (routerStateUrl: RouterStateUrl) => {
      this.weekNumber = routerStateUrl.params.week;
      this.year = routerStateUrl.params.year;
    });

    this.week$ = this.store.pipe(select(weekDetailsSelector));

    this.store.pipe(select(currentUserSelector)).subscribe( (user: User) => 
    {
      console.log(user);
      this.userId = user.id
    });
   // this.store.dispatch(new TryFetchAthletes(this.userId));
    console.log(this.userId);

    this.store.dispatch(new FetchWeekActivities({ week: this.weekNumber, year: this.year }));

    this.weekActivities$ = this.store.pipe(select(weekDaysSelector));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public navigateToWeek(w: { week: string, year: string }) {
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

  public dayAllDialog(dayIndex: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dayIndex: dayIndex
    };

    this.dialog.open(DayDialogComponent, dialogConfig);
  }

  public dayDialog(dayIndex: number, activityIndex: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dayIndex: dayIndex,
      activityIndex: activityIndex
    };

    this.dialog.open(DayDialogComponent, dialogConfig);
  }
}
