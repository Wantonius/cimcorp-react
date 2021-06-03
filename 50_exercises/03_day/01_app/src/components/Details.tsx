import React from 'react';
import {withRouter,RouteComponentProps,match} from 'react-router-dom'
import HotelInfo from '../models/HotelInfo';
import DetailsInfo from './DetailsInfo';
import EditDetails from './EditDetails';

interface MatchDetails {
	id:string;
}

interface Props extends RouteComponentProps<MatchDetails> {
	list:HotelInfo[];	
	editItem(item:HotelInfo):void;
}

interface State {
	index:number;
	edit:boolean
}

class Details extends React.Component<Props,State> {
		
	state:State = {
		index:0,
		edit:false
	}

	componentDidMount() {
		let id:number = parseInt(this.props.match.params.id,10);
		for(let i=0;i<this.props.list.length;i++) {
			if(id === this.props.list[i].id) {
				this.setState({
					index:i
				})
			}
		}
	}
	
	editMode = () => {
		this.setState({
			edit:true
		})
	} 
	
	cancel = () => {
		this.setState({
			edit:false
		})
	}
	
	editItem = (item:HotelInfo) => {
		this.props.editItem(item);
		this.cancel();
		this.props.history.push("/");
	}
	
	render() {
		let style:React.CSSProperties = {
			width:200,
			height:300,
			backgroundColor:"lightgreen",
			margin:"auto",
			textAlign:"center"
		}
		let hotel = this.props.list[this.state.index];
		//TODO create conditional rendering based on the editMode in state. If it is false render DetailsInfo and if it is true render EditDetails. Both with proper props.
	}
}

export default withRouter(Details);