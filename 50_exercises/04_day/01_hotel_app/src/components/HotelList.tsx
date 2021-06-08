import React from 'react'
import Row from './Row';
import HotelInfo from '../models/HotelInfo';
import {removeFromList} from '../actions/hotelActions';
import {connect, ConnectedProps} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
interface State {
	list:HotelInfo[];
	loading:boolean;
	error:string;
}

//TODO create mapStateToProps with list and mapDispatchToProps with removeFromList

const connector = connect(mapStateToProps,mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class HotelList extends React.Component<PropsFromRedux> {

	render() {
		let hotelList = this.props.list.map((item) => {
			return (
				<Row key={item.id} item={item} removeFromList={/*pass the dispatch function here. Remove this comment*/}/>
			)
		})
		return(
		<div style={{margin:"auto",textAlign:"center"}}>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Address</th>
						<th>City</th>
						<th>Country</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{hotelList}
				</tbody>
			</table>
		</div>
		)
	}
}

export default connector(HotelList);