import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './IndexPage.less';

function IndexPage() {
  
  return (
    <div className={styles.IndexPage}>
      <ul>
        <li>
            <Link to="/DragDemo">DragDemo</Link>
        </li>
        <li>
            <Link to="/SortDragDemo">DragSortDemo(正在疯狂完成中...)</Link>
        </li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default IndexPage;

