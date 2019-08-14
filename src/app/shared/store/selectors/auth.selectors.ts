import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const authSelector = createFeatureSelector('auth');
export const errorAuthSelector = createSelector(
  authSelector,
  (authState: AuthState) => authState.error
);
