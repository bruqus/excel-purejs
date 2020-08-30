'use strict';

import { defaultStyles } from '@/constants';
import { camelToDashCase } from '@core/utils';

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const CODES = {
  A: 65,
  Z: 90,
};

function getWidth(state = {}, idx) {
  return (state[idx] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state = {}, idx) {
  return (state[idx] || DEFAULT_HEIGHT) + 'px';
}

function toCell(row, state) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = Object.keys(defaultStyles)
      .map(key => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
      .join(';');
    return `
      <div class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        style="${styles}; width: ${getWidth(state.colState, col)}"
      >${data || ''}</div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div 
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize"data-resize="row"></div>' : '';

  return `
    <div class="row"
      data-type="resizable"
      data-row="${index}"
      style="height: ${getHeight(state, index)}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

function withWidthFrom(state) {
  return (col, index) => ({
    col,
    index,
    width: getWidth(state, index),
  });
}

export function createTable(rowsCount = 10, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state.colState))
    .map(toColumn)
    .join('');

  getWidth(8, 5);

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row, state))
      .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
