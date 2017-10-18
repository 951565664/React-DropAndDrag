import React, { Component, PropTypes } from 'react';
import {connect} from 'dva';

import styles from './index.less';


class DragBox extends React.Component {
	static propTypes = {
		style:PropTypes.object,
		dragEndHandle:PropTypes.func,
		dragStartHandle:PropTypes.func,
		dragMoveHandle:PropTypes.func,
		dragWidth:PropTypes.number,
		dragHeight:PropTypes.number,
		startTop:PropTypes.number,
		startLeft:PropTypes.number,
	}
	constructor(props) {
		super(props);//{startT,startR,DragContainer}
		this.state = {
			startTop: this.props.startTop || 0,
			top: this.props.startTop || 0,
			startLeft: this.props.startLeft  || 0,
			left: this.props.startLeft  || 0,
			clientX:0,
			clientY:0,
			
			moveable:false,
		};
		this.dragWrapperRef=null;

		if(this.props.dragWidth){
			this.dragWidth=this.props.dragWidth;
		}else if(this.props.style && this.props.style.width){
			this.dragWidth=this.props.style.width;
		}else{
			this.dragWidth=200;
		}
		if(this.props.dragHeight){
			this.dragHeight=this.props.dragHeight;
		}else if(this.props.style && this.props.style.width){
			this.dragHeight=this.props.style.height;
		}else{
			this.dragHeight=200;
		}
	}

	onMouseMove=(e) => {
		

		if(this.state.moveable){
			let X1 = e.clientX;
			let Y1 = e.clientY;
			// var bodyWidth = window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
			// var bodyHeight = window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;

			var bodyWidth = this.dragWrapperRef.clientWidth;
			var bodyHeight = this.dragWrapperRef.clientHeight;

			if( this.state.startLeft+(X1-this.state.clientX) > 0 && this.state.startTop+(Y1-this.state.clientY) >0 
			&& this.state.top+(Y1-this.state.clientY) < bodyHeight-this.dragHeight && this.state.left+(X1-this.state.clientX) < bodyWidth-this.dragWidth){
				let _top = this.state.startTop+(Y1-this.state.clientY);
				let _left = this.state.startLeft+(X1-this.state.clientX);

				this.setState({
					top:_top,
					left:_left,
				})
				if(typeof(this.props.dragMoveHandle) == 'function'){
					this.props.dragMoveHandle(_top,_left)
				}
			}
		}
	}
	onMouseDown=(e)=> {
		if(typeof(this.props.dragStartHandle) == 'function'){
			this.props.dragStartHandle(this.state.top,this.state.left)
		}
		this.setState({
			moveable:true,
			clientX:e.clientX,
			clientY: e.clientY,
			startTop:this.state.top,
			startLeft:this.state.left,
		})
	}
	onMouseUp=(e)=> {
		if(typeof(this.props.dragEndHandle) == 'function'){
			this.props.dragEndHandle(this.state.top,this.state.left)
		}
		this.setState({
			moveable:false,
			
		})
	}
	onMouseLeave=(e)=> {
		if(typeof(this.props.dragLeaveHandle) == 'function'){
			this.props.dragLeaveHandle(this.state.top,this.state.left)
		}
		this.setState({
			moveable:false,
		})
	}
	
	render(){
		let _style = {
			zIndex: '1000',
			cursor: 'move',
			...this.props.style?this.props.style:{},
			top: this.state.top+'px',
			left:this.state.left+'px',
			width: this.dragWidth+'px',
			height: this.dragHeight+'px',
			position: 'absolute',
			
			
		};
		return(
			<div style={{position:'relative',width:'100%',height:'100%'}} ref={(ref)=>this.dragWrapperRef=ref}>
			<div style={_style}  
				onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseLeave}>
				
				{this.props.children?this.props.children:null}
			</div>
			</div>
		)
	}

	
	componentWillReceiveProps=(nextProps)=> {
		// 判断 startTop 是否有变化
		if(nextProps.startTop && nextProps.startTop != this.state.startTop){
			this.setState({
				// startTop: nextProps.startTop || 0,
				top: nextProps.startTop || 0,

			})
			
		}

		// 判断 startLeft 是否有变化		
		if(nextProps.startLeft && nextProps.startLeft != this.state.startLeft){
			this.setState({

				// startLeft: nextProps.startLeft  || 0,
				left: nextProps.startLeft  || 0,
			})
			
		}

		//判断 width 是否有变化
		// debugger
		if(nextProps.dragWidth && nextProps.dragWidth != this.dragWidth){
			this.dragWidth=nextProps.dragWidth;

		}else if(nextProps.style && nextProps.style.width && nextProps.style.width != this.dragWidth){
			this.dragWidth=nextProps.style.width;
		}else{
			
			this.dragWidth=200;
			
		}

		//判断 height 是否有变化		
		if(nextProps.dragHeight && nextProps.dragHeight != this.dragHeight){
			this.dragHeight=nextProps.dragHeight;

		}else if(nextProps.style && nextProps.style.height && nextProps.style.height != this.dragHeight){
			this.dragHeight=nextProps.style.height;
		}else{
			this.dragHeight=200;
		}
	}
	
}

export default DragBox;
