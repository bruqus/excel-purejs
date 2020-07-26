'use strict';

export function createStore(reducer, inititalState = {}) {
  let state = reducer({ ...inititalState }, { type: '__INIT__' });
  let listeners = [];

  return {
    subscribe(cb) {
      listeners.push(cb);
      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== cb);
        },
      };
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(listener => listener(state));
    },
    getState() {
      return state;
    },
  };
}
