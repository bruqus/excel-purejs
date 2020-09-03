'use strict';

import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { reducer } from '@/store/reducer';
import { createStore } from '@core/createStore';
import { storage, debounce } from '@core/utils';
import { initialState } from '@/store/initialState';
import { Page } from '@core/Page';

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(reducer, initialState);

    const stateListener = debounce(state => storage('excel-state', state), 300);
    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
