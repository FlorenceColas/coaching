import { Activity } from './activity.model';
import { Day } from './day.model';
import { Week } from './week.model';

export class WeekActivities {
  constructor(
    public week: Week,
    public day: Day,
    public activities: Activity[]
    ) {}
}