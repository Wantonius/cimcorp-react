import React from 'react';
import Redlight from './Redlight';
import Yellowlight from './Yellowlight';
import Greenlight from './Greenlight';

interface Props {};

interface State {
	color:string;
	timer:ReturnType<typeof setInterval> | null;
}

export default class Trafficlight extends React.Component<Props,State> {

	state:State = {
		color:"red",
		timer:null
	}
	
	componentDidMount() {
		//TODO: start the timer and timer state to save to handle to the timer. Use setInterval function. Call changeLight() every 3 seconds.
	}
	
	changeLight = () => {
		//TODO: change the state color variable with a sequence red->green->yellow->red
	}
	
	render() {
		let style:React.CSSProperties = {
			backgroundColor:"black",
			height:630,
			width:220,
			margin:"auto",
			marginTop:100,
			paddingTop:10
		}
		return(
			<div style={style}>
				<Redlight color={this.state.color}/>
				<Yellowlight color={this.state.color}/>
				<Greenlight color={this.state.color}/>
			</div>
		)
	}
	
}