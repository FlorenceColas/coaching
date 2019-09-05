import * as WeekReducer from './week.reducer';
import * as WeekActions from '../actions/week.actions';

describe('*** Week Reducer ***', () => {

  it('should return initial state', () => {
    const { initialWeekState } = WeekReducer;
    const action = {} as any;
    expect(WeekReducer.weekReducer(undefined, action)).toEqual(initialWeekState);
  });

  it('should have empty user, empty token and not logged in flag when SetCurrentWeek action', () => {
    const { initialWeekState } = WeekReducer;
    const action = new WeekActions.SetCurrentWeek({
      week: '34',
      year: '2019',
    });
    const state = WeekReducer.weekReducer(initialWeekState, action);
    expect(state.currentWeek).toEqual({
      week: '34',
      year: '2019',
    });
  });

  it('should have array of days when SetWeekActivities action', () => {
    const { initialWeekState } = WeekReducer;
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
    const action = new WeekActions.SetWeekActivities(payload);
    const state = WeekReducer.weekReducer(initialWeekState, action);
    expect(state.days).toEqual(payload);
  });

  it('should have empty user, empty token and not logged in flag when SetWeekDetails action', () => {
    const { initialWeekState } = WeekReducer;
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
    const action = new WeekActions.SetWeekDetails(payload);
    const state = WeekReducer.weekReducer(initialWeekState, action);
    expect(state.week).toEqual(payload);
  });

});
