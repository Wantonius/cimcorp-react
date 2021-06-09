import React,{useState} from 'react';
import HotelInfo from '../models/HotelInfo';
import {addToList} from '../actions/hotelActions';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';


interface State {
	name:string;
	address:string;
	city:string;
	country:string;
	comment:string;
}

const HotelForm:React.FC<{}> = () => {

	const [state,setState] = useState<State>({
		name:"",
		address:"",
		city:"",
		country:"",
		comment:""
	})
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();

	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.currentTarget.name]:event.currentTarget.value
		});
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let item = new HotelInfo(0,state.name,state.address,state.city,state.country,state.comment);
		dispatch(addToList(item));
		setState({
			name:"",
			address:"",
			city:"",
			country:"",
			comment:""
		})
	}

	return(
		<form onSubmit={onSubmit}>
			<label htmlFor="name">Name:</label>
			<input type="text"
					name="name"
					onChange={onChange}
					value={state.name}/>
			<br/>
			<label htmlFor="address">Address:</label>
			<input type="text"
					name="address"
					onChange={onChange}
					value={state.address}/>
			<br/>
			<label htmlFor="city">City:</label>
			<input type="text"
					name="city"
					onChange={onChange}
					value={state.city}/>
			<br/>
			<label htmlFor="country">Country:</label>
			<input type="text"
					name="country"
					onChange={onChange}
					value={state.country}/>
			<br/>
			<label htmlFor="comment">Comment:</label>
			<input type="text"
					name="comment"
					onChange={onChange}
					value={state.comment}/>
			<br/>				
			<input type="submit" value="Add"/>
		</form>
	)

}

export default HotelForm;