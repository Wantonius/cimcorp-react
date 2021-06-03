import React from 'react';
import HotelInfo from '../models/HotelInfo';

interface Props {
	editMode():void;
	hotel:HotelInfo;
}

export default class DetailsInfo extends React.Component<Props> {
	
	render() {
		return(
			//TODO create a suitable info panel for detailed information about the hotel. Also add the button to change to editmode
		)
	}
}