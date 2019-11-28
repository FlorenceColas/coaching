import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { User } from 'src/app/shared/models/user.model';
import { State } from 'src/app/shared/store';
import { currentUserSelector } from 'src/app/shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }

}
