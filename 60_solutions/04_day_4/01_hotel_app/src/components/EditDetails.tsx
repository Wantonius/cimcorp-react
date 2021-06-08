import React from 'react';
import HotelInfo from '../models/HotelInfo';

interface Props {
	hotel:HotelInfo;
	editItem(item:HotelInfo):void;
	cancel():void;
}

interface State {
	name:string;
	address:string;
	city:string;
	country:string;
	comment:string;	
}

export default class EditDetails extends React.Component<Props,State> {
	state:State = {
		name:this.props.hotel.name,
		address:this.props.hotel.address,
		city:this.props.hotel.city,
		country:this.props.hotel.country,
		comment:this.props.hotel.comment
	}
	
	onChange = (event:React.FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[event.currentTarget.name] = event.currentTarget.value;
		this.setState(state);
	}
	
	onEdit = (e:React.SyntheticEvent) => {
		let item = new HotelInfo(this.props.hotel.id,this.state.name,this.state.address,this.state.city,this.state.country,this.state.comment);
		this.props.editItem(item);
		this.setState({
			name:"",
			address:"",
			city:"",
			country:"",
			comment:""
		})
	}
	
	onCancel = (e:React.SyntheticEvent) => {
		this.props.cancel();
	}
	
	render() {
		return(
			<form>
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
				<button name="edit" onClick={this.onEdit}>Edit</button>
				<button name="cancel" onClick={this.onCancel}>Cancel</button>
			</form>
		)
	}
}