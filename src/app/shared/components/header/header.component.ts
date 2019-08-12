import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { JwtToken } from '../../models/jwt-token.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public jwtToken: JwtToken;
  public subscription: Subscription;
  public weekNumber: number;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.jwtToken.subscribe( (jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    });

    this.weekNumber = this.getWeek(new Date().getTime());
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  public logout(): void {
    this.authService.logout();
  }

  getWeek(d: number): number {
    let date = new Date(d);
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
}
