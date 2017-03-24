import React, { Component, PropTypes } from 'react';
import {connect} from 'dva';

import styles from './dragBox.less';


class DragBox extends React.Component {
	constructor(props) {
		super(props);//{startT,startR,DragContainer}
		this.state = { 
			moveT: this.props.startT,
			moveR: this.props.startR,
			clientX:0,
			clientY:0,
			moveable:false,
		};
	}

	move(e) {
		if(this.state.moveable){
			let X1 = e.clientX;
			let Y1 = e.clientY;
			var bodyWidth = window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
			var bodyHeight = window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
			
			if( this.props.startR-(X1-this.state.clientX) > 0 && this.props.startT+(Y1-this.state.clientY) >0 
				&& this.props.startT+(Y1-this.state.clientY) < bodyHeight-this.props.dragH && this.props.startR-(X1-this.state.clientX) < bodyWidth-this.props.dragW)
			{
				this.setState({
					...this.state,
					moveT:this.props.startT+(Y1-this.state.clientY),
					moveR:this.props.startR-(X1-this.state.clientX),
				})
			}
		}
	}
	down(e) {
		this.setState({
			...this.state,
			moveable:true,
			clientX:e.clientX,
			clientY: e.clientY,
		})
	}
	up(e) {
		this.props.dragEndHandle && this.props.dragEndHandle(this.state.moveT,this.state.moveR);
		!this.props.dragEndHandle && console.error('dragEndHandle没有传');
		this.setState({
			...this.state,
			moveable:false,
		})

		
		
	}
	leave(e) {
		this.props.dragEndHandle && this.props.dragEndHandle(this.state.moveT,this.state.moveR);
		!this.props.dragEndHandle && console.error('dragEndHandle没有传');
		this.setState({
			...this.state,
			moveable:false,
		})
		
	}
	render(){
		var me = this;
		var DragContainer=me.props.DragContainer;
		var className = me.props.className;
		var startT = me.props.startT;
		var startR = me.props.startR;
		var dragW = me.props.dragW;
		var dragH = me.props.dragH;
		var moveT = me.state.moveT;
		var moveR = me.state.moveR;
		var move = me.move.bind(me);
		var down = me.down.bind(me);
		var up = me.up.bind(me);
		var leave = me.leave.bind(me);

		return(
			<div className={styles.dragBox} style={{top: moveT+'px',right: moveR+'px',width: dragW+'px',height: dragH+'px'}}  
				onMouseMove={move} onMouseDown={down} onMouseUp={up} onMouseLeave={leave}>
				<DragContainer></DragContainer>
			</div>
		)
	}
}

export default DragBox;







