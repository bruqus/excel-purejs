'use strict';

import { TABLE_RESIZE } from '@/store/types';

export function reducer(state, action) {
  let field;
  let prevState;

  switch (action.type) {
    case TABLE_RESIZE: {
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, [field]: prevState };
    }
    default:
      return state;
  }
}
