import React,{useState} from 'react';
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

const EditDetails:React.FC<Props> = (props:Props) =>  {
	const [state,setState] = useState<State>({
		name:props.hotel.name,
		address:props.hotel.address,
		city:props.hotel.city,
		country:props.hotel.country,
		comment:props.hotel.comment
	})
	
	const onChange = (event:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.currentTarget.name]:event.currentTarget.value
		});
	}
	
	const onEdit = (e:React.SyntheticEvent) => {
		let item = new HotelInfo(props.hotel.id,state.name,state.address,state.city,state.country,state.comment);
		props.editItem(item);
		setState({
			name:"",
			address:"",
			city:"",
			country:"",
			comment:""
		})
	}
	
	const onCancel = (e:React.SyntheticEvent) => {
		props.cancel();
	}
	
	return(
		<form>
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
			<button name="edit" onClick={onEdit}>Edit</button>
			<button name="cancel" onClick={onCancel}>Cancel</button>
		</form>
	)
}

export default EditDetails;