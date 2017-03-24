import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './DragDemo.less';
import DragBox from '../components/dragBox/dragBox';
import TestDemo from '../components/testDragDemo/testDemo';


function DragDemo({dispatch, DragDemoM}) {
  const dragEndHandle = (startT, startR) => {
    dispatch({
      type: 'DragDemoM/updateState',
      payload: {
        startT: startT,
        startR: startR,
      }
    })
  }

  const DragBoxProps = {
      startT: DragDemoM.startT,
      startR: DragDemoM.startR,
      DragContainer: DragContainer,
      dragEndHandle: dragEndHandle,
      dragW: 200,
      dragH: 200,
  }
  function DragContainer() {
    return (
      <div style={{ width: '200px', height: '200px' }}
        // onMouseDown={(event) => { event.stopPropagation()}}
        // onMouseMove={(event) => { event.stopPropagation()}}
        // onMouseUp={(event) => { event.stopPropagation()}}
        // onMouseLeave={(event) => { event.stopPropagation()}}
        >
        <TestDemo text={'DragPanel'}></TestDemo>
      </div>
    );
  }

  
  
  return (
    <div className={styles.wrapper}>
      <DragBox {...DragBoxProps}></DragBox>
    </div>
  );
}

DragDemo.propTypes = {
};

export default connect(({DragDemoM})=>({DragDemoM}))(DragDemo);