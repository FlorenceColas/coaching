import * as RouterSelectors from './router.selectors';
import { State } from '..';

describe('*** Router Selectors ***', () => {

  it('should return null', () => {
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: null
    };
    expect(RouterSelectors.routerStateSelector(mockState)).toEqual(null);
    expect(RouterSelectors.urlSelector(mockState)).toEqual(null);
    expect(RouterSelectors.paramsSelector(mockState)).toEqual(null);
  });

  it('should return router state', () => {
    const payload = {
      url: 'myurl',
      params: { 'paramskey': 'paramsvalue' },
      queryParams: { 'queryparamskey': 'queryparamsvalue' },
    };
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: {
        state: payload,
        navigationId: null
      }
    };
    expect(RouterSelectors.routerStateSelector(mockState)).toEqual(payload);
  });

  it('should return router url', () => {
    const payload = {
      url: 'myurl',
      params: { 'paramskey': 'paramsvalue' },
      queryParams: { 'queryparamskey': 'queryparamsvalue' },
    };
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: {
        state: payload,
        navigationId: null
      }
    };
    expect(RouterSelectors.urlSelector(mockState)).toEqual(payload.url);
  });

  it('should return router params', () => {
    const payload = {
      url: 'myurl',
      params: { 'paramskey': 'paramsvalue' },
      queryParams: { 'queryparamskey': 'queryparamsvalue' },
    };
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: {
        state: payload,
        navigationId: null
      }
    };
    expect(RouterSelectors.paramsSelector(mockState)).toEqual(payload.params);
  });

  it('should return router query params', () => {
    const payload = {
      url: 'myurl',
      params: { 'paramskey': 'paramsvalue' },
      queryParams: { 'queryparamskey': 'queryparamsvalue' },
    };
    const mockState: State = {
      athletes: null,
      auth: null,
      week: null,
      router: {
        state: payload,
        navigationId: null
      }
    };
    expect(RouterSelectors.queryParamsSelector(mockState)).toEqual(payload.queryParams);
  });

});
