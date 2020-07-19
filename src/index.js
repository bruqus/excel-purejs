'use strict';

import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { reducer } from '@/components/store/reducer';
import { createStore } from '@core/createStore';
import './scss/index.scss';

const store = createStore(reducer, {
  colState: {},
});

const excel = new Excel('#app', {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
  store,
});

excel.render();
