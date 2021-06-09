import React from 'react';
import HotelInfo from '../models/HotelInfo';

interface Props {
	editMode():void;
	hotel:HotelInfo;
}

const DetailsInfo:React.FC<Props> = (props:Props) => {
	
	return(
		<>
				<h3>{props.hotel.name}</h3>
				<p>Address:{props.hotel.address}</p>
				<p>City:{props.hotel.city}</p>
				<p>Country:{props.hotel.country}</p>
				<p>Comment:{props.hotel.comment}</p>
				<button onClick={props.editMode}>Edit</button>
		</>
	)
	
}

export default DetailsInfo;