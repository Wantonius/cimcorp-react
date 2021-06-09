import React from 'react';
import {Link} from 'react-router-dom'
import HotelInfo from '../models/HotelInfo';

interface Props {
	item:HotelInfo;
	removeFromList(id:number):void;
}
const Row:React.FC<Props> = (props:Props) => {

	let url = "/hotel/"+props.item.id
	return(
		<tr>
			<td><Link to={url}>{props.item.name}</Link></td>
			<td>{props.item.address}</td>
			<td>{props.item.city}</td>
			<td>{props.item.country}</td>
			<td><button onClick={() => props.removeFromList(props.item.id)}>Remove</button></td>
		</tr>	
	)
	
}

export default Row;