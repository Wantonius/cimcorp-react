import React from 'react';
import {Link} from 'react-router-dom'
import HotelInfo from '../models/HotelInfo';

interface Props {
	item:HotelInfo;
	removeFromList(id:number):void;
}
export default class Row extends React.Component<Props> {

	render() {
		let url = "/hotel/"+this.props.item.id
		return(
			<tr>
				<td><Link to={url}>{this.props.item.name}</Link></td>
				<td>{this.props.item.address}</td>
				<td>{this.props.item.city}</td>
				<td>{this.props.item.country}</td>
				<td><button onClick={() => this.props.removeFromList(this.props.item.id)}>Remove</button></td>
			</tr>	
		)
	}
}