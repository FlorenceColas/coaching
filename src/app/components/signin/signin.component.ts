import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from 'src/app/shared/store';
import { TrySignin } from 'src/app/shared/store/actions/auth.actions';
import { errorAuthSelector } from 'src/app/shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public errors$: Observable<string>;

  constructor(
      private fb: FormBuilder,
      private store: Store<State>
  ) { }

  ngOnInit() {
    this.errors$ = this.store.pipe(
      select(errorAuthSelector)
    );

    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  public signIn(): void {
    this.store.dispatch(new TrySignin(this.form.value));
  }
}
