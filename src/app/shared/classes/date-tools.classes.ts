import * as moment from 'moment';

export class DateTools {
  public static getPreviousWeek(week: string, year: string): { week: string, year: string } {
    let previousWeek = parseInt(week) - 1;
    let previousYear = parseInt(year);

    if (previousWeek < 1) {
      // return the last week of the previous year
      previousYear--;
      previousWeek = moment(previousYear.toString() + '-12-01').isoWeeksInYear();
    }

    return { week: previousWeek.toString(), year: previousYear.toString() };
  }

  public static getNextWeek(week: string, year: string): { week: string, year: string } {
    let nextWeek = parseInt(week) + 1;
    let nextYear = parseInt(year);

    //check if the week exists
    const maxWeek = moment(nextYear.toString() + '-12-31').isoWeeksInYear();
    if (nextWeek > maxWeek) {
      nextWeek = 1;
      nextYear++;
    }

    return { week: nextWeek.toString(), year: nextYear.toString() };
  }
}
