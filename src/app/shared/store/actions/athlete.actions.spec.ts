import * as AthleteActions from './athlete.actions';

describe('*** Athlete Actions ***', () => {
  
  it('should create a FetchAthletes action', () => {
    const payload= 1;
    const action = new AthleteActions.FetchAthletes(payload);
    expect({ ... action }).toEqual({
      type: AthleteActions.AthleteActionTypes.FETCH_ATHLETES,
      payload
    });
  });

  it('should create a SetAthletes action', () => {
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
    expect({ ... action }).toEqual({
      type: AthleteActions.AthleteActionTypes.SET_ATHLETES,
      payload
    });
  });
  
  it('should create a SetCurrentAthlete action', () => {
    const payload = {
      id: 1,
      name: 'Athlete name 1'
    };
    const action = new AthleteActions.SetCurrentAthlete(payload);
    expect({ ... action }).toEqual({
      type: AthleteActions.AthleteActionTypes.SET_CURRENT_ATHLETE,
      payload
    });
  });

});
