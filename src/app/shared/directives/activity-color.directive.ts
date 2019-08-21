import { Directive, HostBinding, OnInit, Input } from '@angular/core';

const ACTIVITIES_COLORS = {
  off:     { planned: '#BDBDBD', realised: 'hsla(0, 0%, 95%)' }, 
  swim:    { planned: 'rgba(8, 192, 247, 1)', realised: 'hsla(208, 80%, 85%)' },
  bike:    { planned: 'rgba(133, 222, 25, 1)', realised: 'hsla(132, 80%, 85%)' },
  run:     { planned: 'rgba(247, 19, 16, 1)', realised: 'hsla(0, 100%, 85%)' },
  fitness: { planned: 'rgba(181, 107, 250, 1)', realised: 'hsla(279, 100%, 85%)' },
  race:    { planned: 'rgba(250, 139, 22, 1)', realised: 'hsla(23, 100%, 85%)' }
};

@Directive({
  selector: '[appActivityColor]'
})
export class ActivityColorDirective implements OnInit {
  @HostBinding('style.background-color') backgroundColor: string;
  @HostBinding('style.color') color: string;
  @HostBinding('style.font-weight') fontWeight: string
  
  @Input('appActivityColor') activityName: { 
    name: string, 
    status: number, 
    planned: number, 
    resume: boolean
  };   

  constructor() { }

  ngOnInit() {
    if (this.activityName.planned == 1) {
      this.backgroundColor = ACTIVITIES_COLORS[this.activityName.name]['planned'];
      this.color = 'white';
      this.fontWeight = 'bold';
    } else if (this.activityName.resume && this.activityName.status == 1 && this.activityName.planned != 1) {
      this.backgroundColor = ACTIVITIES_COLORS[this.activityName.name]['realised'];
      this.color = 'black';
      this.fontWeight = 'normal';
    } else {
      this.backgroundColor = '';
      this.color = 'black';
      this.fontWeight = 'normal';
    }
  }
}
