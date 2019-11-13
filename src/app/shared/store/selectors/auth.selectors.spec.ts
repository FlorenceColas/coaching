import * as AuthSelectors from './auth.selectors';
import { State } from '..';

describe('*** Auth Selectors ***', () => {

  it('should return null', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: null
    };
    expect(AuthSelectors.errorAuthSelector(mockState)).toEqual(null);
    expect(AuthSelectors.tokenSelector(mockState)).toEqual(null);
    expect(AuthSelectors.currentUserSelector(mockState)).toEqual(null);
  });

  it('should return error', () => {
    const mockState: State = {
      athletes: null,
      auth: {
        user: null,
        token: null,
        isLoggedin: null,
        error: 'fatal error',
      },
      week: null,
      router: null
    };
    expect(AuthSelectors.errorAuthSelector(mockState)).toEqual('fatal error');
  });

  it('should return token', () => {
    const mockState: State = {
      athletes: null,
      auth: {
        user: null,
        token: 'myjwttoken',
        isLoggedin: null,
        error: null,
      },
      week: null,
      router: null
    };
    expect(AuthSelectors.tokenSelector(mockState)).toEqual('myjwttoken');
  });
  
  it('should return isLoggedin true', () => {
    const mockState: State = {
      athletes: null,
      auth: {
        user: null,
        token: 'myjwttoken',
        isLoggedin: true,
        error: null,
      },
      week: null,
      router: null
    };
    expect(AuthSelectors.isLoggedinSelector(mockState)).toEqual(true);
  });

  it('should return isLoggedin false', () => {
    const mockState: State = {
      athletes: null,
      auth: {
        user: null,
        token: null,
        isLoggedin: false,
        error: null,
      },
      week: null,
      router: null
    };
    expect(AuthSelectors.isLoggedinSelector(mockState)).toEqual(false);
  });

  it('should return current user', () => {
    const mockState: State = {
      athletes: null,
      auth: {
        user: {
          id: 1,
          username: 'myusername',
          display: 'mydisplayname',
          password: 'mypassword',
        },
        token: 'myjwttoken',
        isLoggedin: true,
        error: null,
      },
      week: null,
      router: null
    };
    expect(AuthSelectors.currentUserSelector(mockState)).toEqual({
      id: 1,
      username: 'myusername',
      display: 'mydisplayname',
      password: 'mypassword',
    });
  });

});
