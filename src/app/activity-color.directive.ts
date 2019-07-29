import { Directive, HostBinding, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appActivityColor]'
})
export class ActivityColorDirective implements OnInit {
	@HostBinding('class.activity-off') displayColorOff: boolean = false;
	@HostBinding('class.activity-swim') displayColorSwim: boolean = false;
	@HostBinding('class.activity-bike') displayColorBike: boolean = false;
	@HostBinding('class.activity-run') displayColorRun: boolean = false;
	@HostBinding('class.activity-fitness') displayColorFitness: boolean = false;
	@HostBinding('class.activity-race') displayColorRace: boolean = false;
  @Input('appActivityColor') activityName: {name: string, status: number};   

  constructor() { }

  ngOnInit() {
    if (this.activityName.status === 1) {
      switch (this.activityName.name) {
        case 'off':
          this.displayColorOff = true;
          break;
        case 'swim':
          this.displayColorSwim = true;
          break;
        case 'bike':
          this.displayColorBike = true;
          break;
        case 'run':
          this.displayColorRun = true;
          break;
        case 'fitness':
          this.displayColorFitness = true;
          break;
        case 'race':
          this.displayColorRace = true;
          break;
      }
    }
  }
}
