import {hashHistory} from 'dva/router';

export default {
	namespace: 'DragDemoM',
	state: {
		startT:100,
		startR:100,
	},
	subscriptions:{
	},
	effects: {
	},
	reducers: {
		updateState(state,action) {
			return {...state,...action.payload};
		}
	}
}