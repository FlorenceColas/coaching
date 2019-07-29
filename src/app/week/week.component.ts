import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  private weekNumber: number;
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
  
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const now = new Date();

    this.activatedRoute.paramMap.subscribe( (params: ParamMap) => {
      if (params.get("week_number")) {
        this.weekNumber = parseInt(params.get("week_number"));
      } else {

      }
    })
  }
}
