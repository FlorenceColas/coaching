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

	@HostBinding('class.activity-off-light') displayColorOffLight: boolean = false;
	@HostBinding('class.activity-swim-light') displayColorSwimLight: boolean = false;
	@HostBinding('class.activity-bike-light') displayColorBikeLight: boolean = false;
  @HostBinding('class.activity-run-light') displayColorRunLight: boolean = false;
	@HostBinding('class.activity-fitness-light') displayColorFitnessLight: boolean = false;
  @HostBinding('class.activity-race-light') displayColorRaceLight: boolean = false;
  
  @Input('appActivityColor') activityName: {name: string, status: number, planned: number};   

  constructor() { }

  ngOnInit() {
    if (this.activityName.planned == 1) {
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
    if (this.activityName.status == 1 && this.activityName.planned != 1) {
      switch (this.activityName.name) {
        case 'off':
          this.displayColorOffLight = true;
          break;
        case 'swim':
          this.displayColorSwimLight = true;
          break;
        case 'bike':
          this.displayColorBikeLight = true;
          break;
        case 'run':
          this.displayColorRunLight = true;
          break;
        case 'fitness':
          this.displayColorFitnessLight = true;
          break;
        case 'race':
          this.displayColorRaceLight = true;
          break;
      }
    }
    
  }
}
