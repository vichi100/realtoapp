describe('reducers/dataRefreshReducer', () => {
  const mod = require('../../src/reducers/dataRefreshReducer');
  const reducer = mod.default || mod;
  const { triggerRefresh, resetRefresh, TRIGGER_REFRESH, RESET_REFRESH } = mod;

  it('exports reducer and action creators', () => {
    expect(typeof reducer).toBe('function');
    expect(typeof triggerRefresh).toBe('function');
    expect(typeof resetRefresh).toBe('function');
    expect(TRIGGER_REFRESH).toBe('TRIGGER_REFRESH');
    expect(RESET_REFRESH).toBe('RESET_REFRESH');
  });

  it('returns initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ shouldRefresh: false, lastUpdateTime: null });
  });

  it('handles TRIGGER_REFRESH by setting shouldRefresh and timestamp', () => {
    const prev = reducer(undefined, { type: '@@INIT' });
    const next = reducer(prev, triggerRefresh());
    expect(next.shouldRefresh).toBe(true);
    expect(typeof next.lastUpdateTime).toBe('string');
    expect(new Date(next.lastUpdateTime).toString()).not.toBe('Invalid Date');
  });

  it('handles RESET_REFRESH by unsetting shouldRefresh', () => {
    const started = reducer(undefined, triggerRefresh());
    const reset = reducer(started, resetRefresh());
    expect(reset.shouldRefresh).toBe(false);
    // lastUpdateTime is preserved by reducer
    expect(typeof reset.lastUpdateTime).toBe('string');
  });

  it('returns same state object for unknown action', () => {
    const prev = reducer(undefined, { type: '@@INIT' });
    const next = reducer(prev, { type: 'UNKNOWN_ACTION' });
    expect(next).toBe(prev);
  });
});
