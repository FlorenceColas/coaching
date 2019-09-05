import * as WeekSelectors from './week.selectors';
import { State } from '..';
import { stringify } from 'querystring';

describe('*** Week Selectors ***', () => {

  it('should return null', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: null
    };
    expect(WeekSelectors.currentWeekSelector(mockState)).toEqual(null);
    expect(WeekSelectors.currentWeekNumberSelector(mockState)).toEqual(null);
    expect(WeekSelectors.currentWeekYearSelector(mockState)).toEqual(null);
    expect(WeekSelectors.weekDetailsSelector(mockState)).toEqual(null);
    expect(WeekSelectors.weekDaysSelector(mockState)).toEqual(null);
  });

  it('should return current week', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: {
        week: null,
        days: null,
        currentWeek: {
          week: '34',
          year: '2019',
        }
      },
      router: null
    };
    expect(WeekSelectors.currentWeekSelector(mockState)).toEqual({
      week: '34',
      year: '2019',
    });
  });

  it('should return current week number', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: {
        week: null,
        days: null,
        currentWeek: {
          week: '34',
          year: '2019',
        }
      },
      router: null
    };
    expect(WeekSelectors.currentWeekNumberSelector(mockState)).toEqual('34');
  });

  it('should return current year number', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: {
        week: null,
        days: null,
        currentWeek: {
          week: '34',
          year: '2019',
        }
      },
      router: null
    };
    expect(WeekSelectors.currentWeekYearSelector(mockState)).toEqual('2019');
  });

  it('should return Week', () => {
    const payload = {
      nextWeek: {
        week: '37',
        year: '2019'
      },
      number: '36',
      previousWeek: {
        week: '35',
        year: '2019'
      },
      rangeFrom: '1567375200000',
      rangeTo: '1567979999999',
      year: '2019',
    };
    const mockState: State = {
      athletes: null,
      auth: null,
      week: {
        week: payload,
        days: null,
        currentWeek: null
      },
      router: null
    };
    expect(WeekSelectors.weekDetailsSelector(mockState)).toEqual(payload);
  });

  it('should return Days', () => {
    const payload = [
      { day: { day: 1, date: 1567441069734 }, activities: [
        {
          id: 14,
          athleteUserId: 1,
          categoryId: 'off',
          typeId: null,
          activityDay: 1567375200000,
          dayOfWeek: 1,
          planned: 1,
          plannedContent: null,
          plannedDistance: null,
          plannedTime: null,
          realisedContent: null,
          realisedDistance: null,
          realisedTime: null,
          state: null
        },
        {
          id: null,
          athleteUserId: null,
          categoryId: 'swim',
          typeId: null,
          activityDay: 1567441069734,
          dayOfWeek: 1,
          planned: 0,
          plannedContent: null,
          plannedDistance: null,
          plannedTime: null,
          realisedContent: null,
          realisedDistance: null,
          realisedTime: null,
          state: null
        }
      ]},
      { day: { day: 3, date: 1567613869734 }, activities: [
        {
          id: 16,
          athleteUserId: 1,
          categoryId: 'bike',
          typeId: 4,
          activityDay: 1567548000000,
          dayOfWeek: 3,
          planned: 1,
          plannedContent: null,
          plannedDistance: null,
          plannedTime: 45,
          realisedContent: null,
          realisedDistance: null,
          realisedTime: null,
          state: null
        },
        {
          id: 17,
          athleteUserId: 1,
          categoryId: 'run',
          typeId: 7,
          activityDay: 1567548000000,
          dayOfWeek: 3,
          planned: 1,
          plannedContent: "after bike 10' warm up 30' doing 1' faster 2' easy last 5 minutes easy",
          plannedDistance: null,
          plannedTime: 40,
          realisedContent: null,
          realisedDistance: null,
          realisedTime: null,
          state: null
        }
      ]},
    ];
    const mockState: State = {
      athletes: null,
      auth: null,
      week: {
        week: null,
        days: payload,
        currentWeek: null
      },
      router: null
    };
    expect(WeekSelectors.weekDaysSelector(mockState)).toEqual(payload);
  });

  it('should return day by id', function() {
    const fn = WeekSelectors.getDayById(1);
    expect(fn).toEqual(fn);
  });

});
