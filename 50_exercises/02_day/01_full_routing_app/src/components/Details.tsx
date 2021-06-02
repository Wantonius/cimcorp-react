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
		/*TODO Get the id of the detailed item from url
		(this.props.match.params.id) and find the proper
		list index of the item. Either save the index or
		the item itself (you need to modify the existing state)
		to the component state.
		*/
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
				//TODO Create a suitable detailed information box
				//either by accessing the list at the saved index
				//or using the saved item if you went that way.
			</div>
			
			
		)	
	}
}

export default withRouter(Details);