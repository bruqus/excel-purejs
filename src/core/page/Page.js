'use strict';

export class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('"getRoot" method must be implemented');
  }

  afterRender() {}

  destroy() {}
}
