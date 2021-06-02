import React from 'react';
import {withRouter,RouteComponentProps,match} from 'react-router-dom'
import HotelInfo from '../models/HotelInfo';

interface MatchDetails {
	id:string;
}

interface Props extends RouteComponentProps<MatchDetails> {
	list:HotelInfo[];	
}

interface State {
	index:number;
}

class Details extends React.Component<Props,State> {
		
	state:State = {
		index:0
	}

	componentDidMount() {
		//let tempId:string = this.props.match.url.slice(-3);
		let id:number = parseInt(this.props.match.params.id,10);
		for(let i=0;i<this.props.list.length;i++) {
			if(id === this.props.list[i].id) {
				this.setState({
					index:i
				})
			}
		}
	}
	
	render() {
		let style:React.CSSProperties = {
			width:200,
			height:300,
			backgroundColor:"lightgreen",
			margin:"auto",
			textAlign:"center"
		}
		return(
			<div style={style}>
				<h3>{this.props.list[this.state.index].name}</h3>
				<p>Address:{this.props.list[this.state.index].address}</p>
				<p>City:{this.props.list[this.state.index].city}</p>
				<p>Country:{this.props.list[this.state.index].country}</p>
				<p>Comment:{this.props.list[this.state.index].comment}</p>
			</div>
			
			
		)	
	}
}

export default withRouter(Details);