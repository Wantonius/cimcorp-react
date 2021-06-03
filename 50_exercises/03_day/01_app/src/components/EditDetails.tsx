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
	
	//TODO create suitable form for editing the hotel in situ. Also create two buttons to handle the edit and cancel
}