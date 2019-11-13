import * as AuthActions from './auth.actions';

describe('*** Auth Actions ***', () => {
  
  it('should create a Logout action', () => {
    const action = new AuthActions.Logout();
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.LOGOUT
    });
  });

  it('should create a SetCurrentUser action', () => {
    const payload= {
      id: 1,
      username: 'myusername',
      display: 'mydisplayname',
      password: 'mypassword'
    };
    const action = new AuthActions.SetCurrentUser(payload);
    expect({ ... action }).toEqual({
      type: AuthActions.AuthActionTypes.SET_CURRENT_USER,
      payload
    });
  });

  it('should create a SigninError action', () => {
    const payload= {
      error: 'error'
    };
    const action = new AuthActions.SigninError(payload);
    expect({ ... action }).toEqual({
      type: AuthActions.AuthActionTypes.SIGNIN_ERROR,
      payload
    });
  });

  it('should create a SigninSuccess action', () => {
    const payload= 'myjwtpayload';
    const action = new AuthActions.SigninSuccess(payload);
    expect({ ... action }).toEqual({
      type: AuthActions.AuthActionTypes.SIGNIN_SUCCESS,
      payload
    });
  });

  it('should create a TryFetchCurrentUser action', () => {
    const action = new AuthActions.TryFetchCurrentUser();
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.TRY_FETCH_CURRENT_USER
    });
  });

  it('should create a TryRefreskToken action', () => {
    const action = new AuthActions.TryRefreskToken();
    expect({ ...action }).toEqual({
      type: AuthActions.AuthActionTypes.TRY_REFRESH_TOKEN
    });
  });

  it('should create a TrySignin action', () => {
    const payload= {
      username: 'myusername',
      password: 'mypassword'
    };
    const action = new AuthActions.TrySignin(payload);
    expect({ ... action }).toEqual({
      type: AuthActions.AuthActionTypes.TRY_SIGNIN,
      payload
    });
  });

});
