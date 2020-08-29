'use strict';

import { TABLE_RESIZE, CHANGE_TEXT } from '@/store/types';

export function reducer(state, action) {
  let field;
  let prevState;

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, [field]: prevState };
    case CHANGE_TEXT:
      prevState = state['dataState'] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, currentText: action.data.value, dataState: prevState };
    default:
      return state;
  }
}
