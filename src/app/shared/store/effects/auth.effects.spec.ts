import { AuthEffects } from "./auth.effect";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../services/user.service';
import { provideMockActions } from '@ngrx/effects/testing';
import * as AuthActions from '../actions/auth.actions';
import { hot, cold } from 'jasmine-marbles';
import { reducers, State } from '../index';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('*** Auth Effects ***', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;
  let routerService: Router;
  let authService: AuthService;
  let userService: UserService;
  let store: MockStore<State>;
  const initialState = { 
    auth: {
      user: null,
      token: null,
      isLoggedin: false,
      error: null
    },
    week: null,
    router: null,
    athletes: null 
  };

  beforeAll( () => {
    TestBed.configureTestingModule( {
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers),
        RouterTestingModule.withRoutes([{ path: '', component: {} as any }])
      ],
      providers: [
        AuthEffects,
        provideMockActions( () => actions),
        provideMockStore({ initialState }),
        UserService,
        AuthService
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    routerService = TestBed.get(Router);
    store = TestBed.get<Store<State>>(Store);
  });

  describe('** logout$ effect **', () => {
    it('should navigate to /', () => {
      jasmine.createSpy('navigate').and.callThrough();
      actions = hot('---a-', { a: new AuthActions.Logout() });
      const expected = hot('---b', { b: new AuthActions.Logout() });
      expect(effects.logout$).toBeObservable(expected);
      
      effects.logout$.subscribe( () => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      });        
    });
  });

  describe('** signinSuccess$ effect **', () => {
    it('should navigate to /', () => {
      jasmine.createSpy('navigate').and.callThrough();
      actions = hot('---a-', { a: new AuthActions.SigninSuccess('myjwt') });
      const expected = cold('---b', { b: 'myjwt' });
      expect(effects.signinSuccess$).toBeObservable(expected);
      
      effects.signinSuccess$.subscribe( () => {
        expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });

  describe('** tryFetchCurrentUser$ **', () => {
    it('should return SetCurrentUser action', () => {
      jasmine.createSpy('getCurrentUser').and.returnValue(of({
        id: 1,
        username: 'myusername',
        display: 'mydisplayname',
        password: 'mypassword'
      }));
      actions = hot('---a-', { a: new AuthActions.TryFetchCurrentUser() });
      const expected = cold('---b', { b: new AuthActions.SetCurrentUser({
        id: 1,
        username: 'myusername',
        display: 'mydisplayname',
        password: 'mypassword'
      }) });
      expect(effects.tryFetchCurrentUser$).toBeObservable(expected);
    });

    it('should return empty due to userService error', () => {
      jasmine.createSpy('getCurrentUser').and.returnValue(cold('-#|', {}, 'error'));
      actions = hot('---a-', { a: new AuthActions.TryFetchCurrentUser() });
      const expected = cold('----|');
      expect(effects.tryFetchCurrentUser$).toBeObservable(expected);
    });
  });

  describe('** tryRefreshToken$ effect **', () => {
    it('should return SigninSuccess action', () => {
      store.setState({ 
        auth: {
          user: null,
          token: 'mytokeninstore',
          isLoggedin: false,
          error: null
        },
        week: null,
        athletes: null,
        router: null
      });
        
      jasmine.createSpy('refreshToken').and.returnValue(of('myjwt'));
      actions = hot('---a-', { a: new AuthActions.TryRefreskToken() });
      const expected = cold('---b', { b: new AuthActions.SigninSuccess('myjwt') });
      expect(effects.tryRefreshToken$).toBeObservable(expected);
    });
  
    it('should return empty due to authService error', () => {
      store.setState({ 
        auth: {
          user: null,
          token: 'mytokeninstore',
          isLoggedin: false,
          error: null
        },
        week: null,
        athletes: null,
        router: null
      });
      jasmine.createSpy('refreshToken').and.returnValue(cold('-#|', {}, 'error'));
      actions = hot('---a-', { a: new AuthActions.TryRefreskToken() });
      const expected = cold('');
      expect(effects.tryRefreshToken$).toBeObservable(expected);
    });

    it('should return empty due to null token in the store', () => {
      store.setState({ 
        auth: {
          user: null,
          token: null,
          isLoggedin: false,
          error: null
        },
        week: null,
        athletes: null,
        router: null
      });
      actions = hot('---a-', { a: new AuthActions.TryRefreskToken() });
      const expected = cold('');
      expect(effects.tryRefreshToken$).toBeObservable(expected);
    });
  });
    
  describe('** trySignin$ effect **', () => {
    it('should return SigninSuccess action', () => {
      jasmine.createSpy('signIn').and.returnValue(of('myjwt'));
      actions = hot('---a-', { a: new AuthActions.TrySignin({ username: 'myusername', password: 'mypassword' }) });
      const expected = cold('---b', { b: new AuthActions.SigninSuccess('myjwt')});
      expect(effects.trySignin$).toBeObservable(expected);
    });
  
    it('should return SigninError action', () => {
      jasmine.createSpy('signIn').and.returnValue(cold('-#', {}, 'error'));
      actions = hot('---a-', { a: new AuthActions.TrySignin({ username: 'myusername', password: 'mypassword' }) });
      const expected = cold('----b', { b: new AuthActions.SigninError('error') });
      expect(effects.trySignin$).toBeObservable(expected);
    });
  });

});
