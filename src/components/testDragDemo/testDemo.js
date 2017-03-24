import React, { Component, PropTypes } from 'react';
import {connect} from 'dva';

import styles from './testDemo.less';


const TestDemo = (props) => {
	return(
		<div className={styles.test}>
        	{props.text}
		</div>
	)
}
export default TestDemo;