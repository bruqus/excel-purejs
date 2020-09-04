import { createStore } from './createStore';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 };
  }

  return state;
};

describe('createStore', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  describe('returns an object', () => {
    it('is defined', () => {
      expect(store).toBeDefined();
    });

    describe('with', () => {
      describe('subcribe field', () => {
        it('is defined', () => {
          expect(store.subscribe).toBeDefined();
        });

        it('is called', () => {
          store.subscribe(handler);
          store.dispatch({ type: 'ADD' });

          expect(handler).toHaveBeenCalled();
          expect(handler).toHaveBeenCalledWith(store.getState());
        });

        it('is not called if unsubscribe', () => {
          const sub = store.subscribe(handler);
          sub.unsubscribe();
          store.dispatch({ type: 'ADD' });

          expect(handler).not.toHaveBeenCalled();
        });
      });

      describe('dispatch field', () => {
        it('is defined', () => {
          expect(store.dispatch).toBeDefined();
        });

        it('changes state if the action exists', () => {
          store.dispatch({ type: 'ADD' });
          expect(store.getState().count).toBe(1);
        });

        it('does not change state if the action does not exist', () => {
          store.dispatch({ type: 'NOT_EXISTING_ACTION' });
          expect(store.getState().count).toBe(0);
        });
      });

      describe('getState field', () => {
        it('is defined', () => {
          expect(store.getState).toBeDefined();
        });

        it('returns an object', () => {
          expect(store.getState()).toBeInstanceOf(Object);
        });

        it('returns a default state object if no arg was passed', () => {
          expect(store.getState()).toEqual(initialState);
        });
      });
    });
  });
});
