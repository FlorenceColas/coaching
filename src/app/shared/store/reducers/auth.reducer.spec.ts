import * as AuthReducer from './auth.reducer';
import * as AuthActions from '../actions/auth.actions';

describe('*** Auth Reducer ***', () => {

  it('should return initial state', () => {
    const { initialAuthState } = AuthReducer;
    const action = {} as any;
    expect(AuthReducer.authReducer(undefined, action)).toEqual(initialAuthState);
  });

  it('should have empty user, empty token and not logged in flag when Logout action', () => {
    const { initialAuthState } = AuthReducer;
    const logout = new AuthActions.Logout();
    const state = AuthReducer.authReducer(initialAuthState, logout);
    expect(state.isLoggedin).toEqual(false);
    expect(state.token).toEqual(null);
    expect(state.error).toEqual(null);
    expect(state.user).toEqual(null);
  });

  it('should have an error when SigninError action', () => {
    const { initialAuthState } = AuthReducer;
    const action = new AuthActions.SigninError('error');
    const state = AuthReducer.authReducer(initialAuthState, action);
    expect(state.error).toEqual('error');
  });

  it('should have jwt token, is logged in flag when SigninSuccess action', () => {
    const { initialAuthState } = AuthReducer;
    const action = new AuthActions.SigninSuccess('myjwtpaylod');
    const state = AuthReducer.authReducer(initialAuthState, action);
    expect(state.token).toEqual('myjwtpaylod');
    expect(state.isLoggedin).toEqual(true);
    expect(state.error).toEqual(null);
  });

  it('should have user when SetCurrentUser action', () => {
    const { initialAuthState } = AuthReducer;
    const action = new AuthActions.SetCurrentUser({
      username: 'myusername',
      display: 'mydisplayname',
      password: 'mypassword'
    });
    const state = AuthReducer.authReducer(initialAuthState, action);
    expect(state.user).toEqual({
      username: 'myusername',
      display: 'mydisplayname',
      password: 'mypassword'
    });
  });

});
