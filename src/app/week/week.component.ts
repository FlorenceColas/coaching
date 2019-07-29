import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

interface ActivityInterface {
  name: string, 
  status: number 
}
interface DayInterface {
  day: number,
  day_label: string,
  date: number
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
    { day: { day: 1, day_label: "Monday", date: 12314562 }, activities: [
      { name: "off", status: 0 },
      { name: "swim", status: 0 },
      { name: "bike", status: 1 },
      { name: "run", status: 0 }, 
      { name: "fitness", status: 1 }, 
      { name: "race", status: 0 } 
    ]
    },
    { day: { day: 2, day_label: "Tuesday", date: 12314562 }, activities: [
      { name: "off", status: 0 },
      { name: "swim", status: 1 },
      { name: "bike", status: 0 },
      { name: "run", status: 1 }, 
      { name: "fitness", status: 0 }, 
      { name: "race", status: 1 } 
    ]
    },
//newDate.setDate(now.getDate() + 2)
    { day: { day: 3, day_label: "Wednesday", date: 12314562 }, activities: [
      { name: "off", status: 0 },
      { name: "swim", status: 1 },
      { name: "bike", status: 0 },
      { name: "run", status: 1 }, 
      { name: "fitness", status: 0 }, 
      { name: "race", status: 0 } 
    ]
    },
    { day: { day: 4, day_label: "Thursday", date: 12314562 }, activities: [
      { name: "off", status: 1 },
      { name: "swim", status: 0 },
      { name: "bike", status: 0 },
      { name: "run", status: 0 }, 
      { name: "fitness", status: 0 }, 
      { name: "race", status: 0 } 
    ]
    },
    { day: { day: 5, day_label: "Friday", date: 12314562 }, activities: [
      { name: "off", status: 0 },
      { name: "swim", status: 0 },
      { name: "bike", status: 0 },
      { name: "run", status: 1 }, 
      { name: "fitness", status: 0 }, 
      { name: "race", status: 0 } 
    ]
    },
    { day: { day: 6, day_label: "Saturday", date: 12314562 }, activities: [
      { name: "off", status: 0 },
      { name: "swim", status: 0 },
      { name: "bike", status: 1 },
      { name: "run", status: 1 }, 
      { name: "fitness", status: 0 }, 
      { name: "race", status: 0 } 
    ]
    },
    { day: { day: 7, day_label: "Sunday", date: 12314562 }, activities: [
      { name: "off", status: 0 },
      { name: "swim", status: 1 },
      { name: "bike", status: 1 },
      { name: "run", status: 0 }, 
      { name: "fitness", status: 0 }, 
      { name: "race", status: 0 } 
    ]
    },
  ];
  private weekNumber: number;
  public dayTitle: string;

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

    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      if (params.get("id")) {
        this.weekNumber = parseInt(params.get("id"));
        console.log(this.weekNumber);
      } else {
        this.weekNumber = 0;
        //get current week
      }
    })
  }
}
