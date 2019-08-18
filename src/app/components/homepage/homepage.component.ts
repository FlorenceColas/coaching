import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { SetCurrentWeek } from 'src/app/shared/store/actions/week.actions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private store: Store<State>){}

  ngOnInit() {
  }

  changeWeek(week: string) {
    this.store.dispatch(new SetCurrentWeek({number: '34', year: '2019'}));
  }
}
