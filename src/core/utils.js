'use strict';

export function capitalize(str) {
  if (typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }

  return new Array(end - start + 1).fill('').map((_, idx) => start + idx);
}

export function storage(key, data) {
  if (!data) return JSON.parse(localStorage.getItem(key));

  localStorage.setItem(key, JSON.stringify(data));
}
