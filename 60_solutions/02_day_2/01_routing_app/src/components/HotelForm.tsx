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
		event.preventDefault();
		let item = new HotelInfo(0,this.state.name,this.state.address,this.state.city,this.state.country,this.state.comment);
		this.props.addToList(item);
		this.setState({
			name:"",
			address:"",
			city:"",
			country:"",
			comment:""
		})
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="name">Name:</label>
				<input type="text"
						name="name"
						onChange={this.onChange}
						value={this.state.name}/>
				<br/>
				<label htmlFor="address">Address:</label>
				<input type="text"
						name="address"
						onChange={this.onChange}
						value={this.state.address}/>
				<br/>
				<label htmlFor="city">City:</label>
				<input type="text"
						name="city"
						onChange={this.onChange}
						value={this.state.city}/>
				<br/>
				<label htmlFor="country">Country:</label>
				<input type="text"
						name="country"
						onChange={this.onChange}
						value={this.state.country}/>
				<br/>
				<label htmlFor="comment">Comment:</label>
				<input type="text"
						name="comment"
						onChange={this.onChange}
						value={this.state.comment}/>
				<br/>				
				<input type="submit" value="Add"/>
			</form>
		)
	}
}