import React from 'react';
import { connect } from 'dva';
import styles from './DragDemo.less';
import Drag from '../components/drag';


class DragDemo extends React.Component{
  state = {
		startTop:10,
		startLeft:10,
  };

  dragMoveHandle(startTop,startLeft){
    this.setState({
      startTop,
      startLeft,
    })
  }
  
  render(){
    return (
    <div className={styles.normal}>
      <div style={{position:'relative',width:'100%',height:'300px',backgroundColor:'#ccc'}}>
        活动区域
      <Drag style={{border: '1px solid #c30000'}}>  
        <div>
            这是drag1
        </div>
      </Drag>
      </div>
      <div style={{height:'50px'}}></div>
      <div style={{position:'relative',width:'100%',height:'300px',backgroundColor:'#ccc'}}>
        活动区域
      <Drag>  
        <div>
            这是drag2,
        </div>
      </Drag>
      </div>
      <div style={{height:'50px'}}></div>
      
      <div style={{position:'relative',width:'100%',height:'300px',backgroundColor:'#ccc'}}>
        活动区域
      <Drag style={{border: '1px solid #c30000'}} startTop={this.state.startTop } startLeft={this.state.startLeft } dragMoveHandle={this.dragMoveHandle.bind(this)}>  
        <div >
            这是drag3
        </div>
      </Drag>
      </div>
    </div>
  );
}
}

export default DragDemo;
