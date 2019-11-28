import * as AthleteSelectors from './athlete.selectors';
import { State } from '..';

describe('*** Athlete Selectors ***', () => {

  it('should return null', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: null
    };
    expect(AthleteSelectors.allAthletesSelector(mockState)).toEqual(null);
    expect(AthleteSelectors.allAthletesSelector(mockState)).toEqual(null);
    expect(AthleteSelectors.currentAthleteSelector(mockState)).toEqual(null);
  });

  it('should return array of Athletes', () => {
    const payload = [
      {
        id: 1,
        name: 'name 1'
      },
      {
        id: 2,
        name: 'name 2'
      }
    ];
    const mockState: State = {
      athletes: {
        athletes: payload,
        current: null
      },
      auth: null,
      week: null,
      router: null
    };
    expect(AthleteSelectors.allAthletesSelector(mockState)).toEqual(payload);
  });

});
