import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public form: FormGroup;
  public error: string;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  public signIn(): void {
    this.authService.signIn(this.form.value).subscribe( () => {
      this.router.navigate(['/']);
    }, err => {
      this.error = err.error;
    });
  }
}
