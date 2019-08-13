export interface Activity {
    id: number,
    athleteUserId: number,
    categoryId: number,
    typeId: number,
    week: number,
    activityDay: number,
    plannedContent: string,
    plannedDistance: number,
    plannedTime: number,
    realisedContent: string,
    realisedDistance: number,
    realisedTime: number,
    state: number
}
