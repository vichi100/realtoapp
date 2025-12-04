import configureStore from '../../src/store/index';
import { ACTION_TYPES } from '../../src/reducers/ActionType';
import { triggerRefresh, resetRefresh } from '../../src/reducers/dataRefreshReducer';

describe('Redux store configuration', () => {
  it('creates store with AppReducer and dataRefresh slices', () => {
    const store = configureStore();
    const state = store.getState();
    expect(state).toHaveProperty('AppReducer');
    expect(state).toHaveProperty('dataRefresh');
    expect(state.dataRefresh.shouldRefresh).toBe(false);
    expect(state.AppReducer.globalSearchResult).toEqual([]);
  });

  it('updates dataRefresh.shouldRefresh via trigger/reset actions', () => {
    const store = configureStore();
    store.dispatch(triggerRefresh());
    let state = store.getState();
    expect(state.dataRefresh.shouldRefresh).toBe(true);
    expect(typeof state.dataRefresh.lastUpdateTime).toBe('string');

    store.dispatch(resetRefresh());
    state = store.getState();
    expect(state.dataRefresh.shouldRefresh).toBe(false);
  });

  it('handles AppReducer actions (SET_GLOBAL_SEARCH_RESULT)', () => {
    const store = configureStore();
    const payload = [{ id: 1 }, { id: 2 }];
    store.dispatch({ type: ACTION_TYPES.SET_GLOBAL_SEARCH_RESULT, payload });
    const state = store.getState();
    expect(state.AppReducer.globalSearchResult).toEqual(payload);
  });
});
