import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
	@HostBinding('class.border-current-day') displayBorder: boolean = false;
  @Input('appBorder') day: string;   

  constructor() { }

  ngOnInit() {
    const now2 = new Date();
    var d = now2.getDate();
    var m = now2.getMonth() + 1;
    var y = now2.getFullYear();
    const currentDay = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    if (this.day === currentDay) {
      this.displayBorder = true;
    }
  }
}
