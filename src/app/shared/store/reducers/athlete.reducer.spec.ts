import * as AthleteReducer from './athlete.reducer';
import * as AthleteActions from '../actions/athlete.actions';

describe('*** Athlete Reducer ***', () => {

  it('should return initial state', () => {
    const { initialAthleteState } = AthleteReducer;
    const action = {} as any;
    expect(AthleteReducer.athleteReducer(undefined, action)).toEqual(initialAthleteState);
  });

  it('should have array of Athlete when SetAthletes action', () => {
    const { initialAthleteState } = AthleteReducer;
    const payload = [
      {
        id: 1,
        name: 'Athlete name 1'
      },
      {
        id: 2,
        name: 'Athlete name 2'
        }
      ];
    const action = new AthleteActions.SetAthletes(payload);
    const state = AthleteReducer.athleteReducer(initialAthleteState, action);
    expect(state.athletes).toEqual(payload);
  });

  it('should have an Athlete when SigninError action', () => {
    const { initialAthleteState } = AthleteReducer;
    const payload = {
      id: 1,
      name: 'Athlete name 1'
    };
    const action = new AthleteActions.SetCurrentAthlete(payload);
    const state = AthleteReducer.athleteReducer(initialAthleteState, action);
    expect(state.current).toEqual(payload);
  });

});
