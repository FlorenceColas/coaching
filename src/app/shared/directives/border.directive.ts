import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
	@HostBinding('class.border-current-day') displayBorder: boolean = false;
  @Input('appBorder') day: string;   

  constructor() { }

  ngOnInit() {
    const currentDay = moment(new Date()).clone().format('DD/MM/YYYY');
    
    if (this.day === currentDay) {
      this.displayBorder = true;
    }
  }
}
