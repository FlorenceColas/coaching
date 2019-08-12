import { ActivityResume } from './activity-resume.model';
import { Day } from './day.model';

export class DayActivities {
	constructor(
    public activities: ActivityResume[],
		public day: Day
	) {}
}
