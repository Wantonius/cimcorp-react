import React from 'react';
import HotelInfo from '../models/HotelInfo';

interface Props {
	editMode():void;
	hotel:HotelInfo;
}

export default class DetailsInfo extends React.Component<Props> {
	
	render() {
		return(
			<>
					<h3>{this.props.hotel.name}</h3>
					<p>Address:{this.props.hotel.address}</p>
					<p>City:{this.props.hotel.city}</p>
					<p>Country:{this.props.hotel.country}</p>
					<p>Comment:{this.props.hotel.comment}</p>
					<button onClick={this.props.editMode}>Edit</button>
			</>
		)
	}
}