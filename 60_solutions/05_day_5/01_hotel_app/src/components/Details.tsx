import React,{useEffect,useState} from 'react';
import {withRouter,RouteComponentProps} from 'react-router-dom'
import HotelInfo from '../models/HotelInfo';
import DetailsInfo from './DetailsInfo';
import EditDetails from './EditDetails';
import {useDispatch,useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {editItem} from '../actions/hotelActions';

interface MatchDetails {
	id:string;
}

interface Props extends RouteComponentProps<MatchDetails>  {
}


interface State {
	index:number;
	edit:boolean
}

interface ListState {
	list:HotelInfo[]
}


const Details:React.FC<Props> = (props:Props) =>  {
		
	const listState = (state:ListState) => state.list
	
	const list = useSelector(listState);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch()
 					
	const [state,setState] = useState<State>({
		index:0,
		edit:false
	})
	
	useEffect(() => {
		let id:number = parseInt(props.match.params.id,10);
		for(let i=0;i<list.length;i++) {
			if(id === list[i].id) {
				setState({
					...state,
					index:i
				})
			}
		}
	},[]);
	
	const editMode = () => {
		setState({
			...state,
			edit:true
		})
	} 
	
	const cancel = () => {
		setState({
			...state,
			edit:false
		})
	}
	
	const edit = (item:HotelInfo) => {
		dispatch(editItem(item));
		cancel();
		props.history.push("/");
	}

	
	let style:React.CSSProperties = {
		width:200,
		height:300,
		backgroundColor:"lightgreen",
		margin:"auto",
		textAlign:"center"
	}
	let hotel = list[state.index];
	if(!state.edit) {
		return(
			<div style={style}>
				<DetailsInfo hotel={hotel} editMode={editMode}/>
			</div>	
		)
	} else {
		return(
			<div style={style}>
				<EditDetails hotel={hotel} editItem={edit}  cancel={cancel}/>
			</div>
		)
	}
	
}

export default withRouter(Details);