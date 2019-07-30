import { Week } from './week.model';
import { DayActivities } from './day-activities.model';

export class WeekActivities {
  constructor(
    public days: DayActivities[],
    public week: Week
    ) {}
}