import React from 'react';
import HotelInfo from '../models/HotelInfo';

interface Props {
	addToList(item:HotelInfo):void;
}

interface State {
	name:string;
	address:string;
	city:string;
	country:string;
	comment:string;
}

export default class HotelForm extends React.Component<Props,State> {

	state:State = {
		name:"",
		address:"",
		city:"",
		country:"",
		comment:""
	}
	
	onChange = (event:React.FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[event.currentTarget.name] = event.currentTarget.value;
		this.setState(state);
	}
	
	onSubmit = (event:React.SyntheticEvent) => {
		//TODO Create the submit function
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				//TODO Create a suitable form for the component state
			</form>
		)
	}
}