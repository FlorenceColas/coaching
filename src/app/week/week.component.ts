import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface ActivityInterface {
  name: string, 
  status: number,
  planned: number
}
interface DayInterface {
  day: number,
  day_label: string,
  date: number,
  date_iso: string
}
interface WeekInterface {
  day: DayInterface,
  activities: ActivityInterface[]
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  public dayNow: number = Date.now();
  public week: WeekInterface[] = [
    { day: { day: 1, day_label: "Monday", date: 1564416693193, date_iso: '2019-07-29' }, activities: [
      { name: "off", status: 0, planned: 0 },
      { name: "swim", status: 0, planned: 0 },
      { name: "bike", status: 1, planned: 1 },
      { name: "run", status: 0, planned: 0 }, 
      { name: "fitness", status: 1, planned: 1 }, 
      { name: "race", status: 0, planned: 0 } 
    ]
    },
    { day: { day: 2, day_label: "Tuesday", date: 1567716693193, date_iso: '2019-07-30' }, activities: [
      { name: "off", status: 0, planned: 0 },
      { name: "swim", status: 1, planned: 0 },
      { name: "bike", status: 0, planned: 0 },
      { name: "run", status: 1, planned: 1 }, 
      { name: "fitness", status: 0, planned: 0 }, 
      { name: "race", status: 1, planned: 0 } 
    ]
    },
//newDate.setDate(now.getDate() + 2)
    { day: { day: 3, day_label: "Wednesday", date: 1567716693193, date_iso: '2019-07-31' }, activities: [
      { name: "off", status: 0, planned: 0 },
      { name: "swim", status: 1, planned: 1 },
      { name: "bike", status: 0, planned: 0 },
      { name: "run", status: 1, planned: 1 }, 
      { name: "fitness", status: 0, planned: 0 }, 
      { name: "race", status: 0, planned: 0 } 
    ]
    },
    { day: { day: 4, day_label: "Thursday", date: 1567716693193, date_iso: '2019-08-01' }, activities: [
      { name: "off", status: 1, planned: 1 },
      { name: "swim", status: 0, planned: 0 },
      { name: "bike", status: 0, planned: 0 },
      { name: "run", status: 0, planned: 0 }, 
      { name: "fitness", status: 0, planned: 0 }, 
      { name: "race", status: 0, planned: 0 } 
    ]
    },
    { day: { day: 5, day_label: "Friday", date: 1567716693193, date_iso: '2019-08-02' }, activities: [
      { name: "off", status: 0, planned: 0 },
      { name: "swim", status: 0, planned: 0 },
      { name: "bike", status: 0, planned: 0 },
      { name: "run", status: 1, planned: 1 }, 
      { name: "fitness", status: 0, planned: 1 }, 
      { name: "race", status: 0, planned: 0 } 
    ]
    },
    { day: { day: 6, day_label: "Saturday", date: 1567716693193, date_iso: '2019-08-03' }, activities: [
      { name: "off", status: 0, planned: 0 },
      { name: "swim", status: 0, planned: 0 },
      { name: "bike", status: 1, planned: 1 },
      { name: "run", status: 1, planned: 1 }, 
      { name: "fitness", status: 0, planned: 0 }, 
      { name: "race", status: 0, planned: 0 } 
    ]
    },
    { day: { day: 7, day_label: "Sunday", date: 1567716693193, date_iso: '2019-08-04' }, activities: [
      { name: "off", status: 0, planned: 0 },
      { name: "swim", status: 1, planned: 1 },
      { name: "bike", status: 1, planned: 0 },
      { name: "run", status: 0, planned: 0 }, 
      { name: "fitness", status: 0, planned: 0 }, 
      { name: "race", status: 0, planned: 0 } 
    ]
    },
  ];
  public weekNumber: number;
  public dayTitle: string;
  public weekRangeFrom: number;
  public weekRangeTo: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  getDayName(dateValue: number, locale: string) {
    var date = new Date(dateValue);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
  }

  ngOnInit() {
    const now = new Date().getTime();
    this.dayTitle = this.getDayName(now, "nl-NL");

    const weekRange = this.getDateRangeOfWeek(31, 2019);
    this.weekRangeFrom = weekRange.from;
    this.weekRangeTo = weekRange.to;

    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      if (params.get("id")) {
        this.weekNumber = parseInt(params.get("id"));
      } else {
        //get current week
        this.weekNumber = this.getWeek(now);
      }
    })
  }

  getDateRangeOfWeek(weekNumber: number, y: number): {from: number, to: number} {
    let d1 = new Date('' + y + '');
    let daysPastSinceLastMonday: number = d1.getDay() - 1;
    let rangeFrom: number, rangeTo: number;
    
    d1.setDate(d1.getDate() - daysPastSinceLastMonday);
    d1.setDate(d1.getDate() + (7 * (weekNumber - this.getWeek(d1.getTime()))));
    rangeFrom = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
    d1.setDate(d1.getDate() + 6);
    rangeTo = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
    return {from: rangeFrom, to: rangeTo};
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
