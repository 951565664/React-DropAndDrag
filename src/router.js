import React from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import DragDemo from './routes/DragDemo';
// import SortDragDemo from './routes/SortDragDemo';
import IndexPage from './routes/IndexPage';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}/>
      <Route path="/DragDemo" component={DragDemo}/>
      <Route path="/SortDragDemo" component={IndexPage}/>
    </Router>
  );
};
