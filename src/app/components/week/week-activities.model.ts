export interface Week {
  id: number,
  nextWeek: number,
  number: number,
  previousWeek: number,
  rangeFrom: number,
  rangeTo: number,
  year: number,
}

export interface Activity {
  id: number,
  athleteUserId: number,
  categoryId: number,
  typeId: number,
  activityDay: number,
  plannedContent: string,
  plannedDistance: number,
  plannedTime: number,
  realisedContent: string,
  realisedDistance: number,
  realisedTime: number,
  state: number
}

export interface WeekActivities {
  days: {
    [day: number]: Activity,
  },
  week: Week,
}
