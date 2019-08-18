import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../helpers/router.helper';

export const routerSelector = createFeatureSelector('router');
export const routerStateSelector = createSelector(
  routerSelector,
  (routerStateUrl: any) => {
    if (routerStateUrl) {
      return routerStateUrl.state;
    } else {
      return null;
    }
  }
);
export const urlSelector = createSelector(
  routerStateSelector,
  (routerStateUrl: RouterStateUrl) => {
    if (routerStateUrl) {
      return routerStateUrl.url;
    } else {
      return null;
    }
  }
);
export const paramsSelector = createSelector(
  routerStateSelector,
  (routerStateUrl: RouterStateUrl) => {
    if (routerStateUrl) {
      return routerStateUrl.params;
    } else {
      return null;
    }
  }
);
export const queryParamsSelector = createSelector(
  routerStateSelector,
  (routerStateUrl: RouterStateUrl) => {
    if (routerStateUrl) {
      return routerStateUrl.queryParams;
    } else {
      return null;
    }
  }
);
