import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
	@HostBinding('class.border-current-day') displayBorder: boolean = false;
  @Input('appBorder') day: string;   

  constructor() { }

  ngOnInit() {
    const currentDay = new Date().toISOString().slice(0, 10);

    if (this.day === currentDay) {
      this.displayBorder = true;
    }
  }
}
