import React from 'react'
import Row from './Row';
import HotelInfo from '../models/HotelInfo';
import {removeFromList} from '../actions/hotelActions';
import {useSelector,useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

interface ListState {
	list:HotelInfo[]
}
 
const HotelList:React.FC<{}> = () => {

	const listState = (state:ListState) => state.list
	
	const list = useSelector(listState);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch()
	
	let hotelList = list.map((item) => {
		return (
			<Row key={item.id} item={item} removeFromList={() => dispatch(removeFromList(item.id))}/>
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

export default HotelList;