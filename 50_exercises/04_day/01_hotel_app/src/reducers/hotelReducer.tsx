import * as actionConstants from '../actions/actionConstants';
import {HotelState} from './stateTypes';
import {AnyAction} from 'redux';

const initialState:HotelState = {
	loading:false,
	list:[],
	error:""
}

const loginReducer = (state:HotelState = initialState, action:AnyAction): HotelState => {
	switch(action.type) {
		//TODO handle all the cases from actionConstants like in the example
		default:
			return state;
	}
}

export default loginReducer;