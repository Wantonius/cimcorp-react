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
				//TODO Create a table row with the first column
				//as <Link> to the Details (url:"/hotel/:id");
			</tr>	
		)
	}
}