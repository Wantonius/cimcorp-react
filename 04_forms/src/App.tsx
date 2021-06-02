import React from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';

interface State {
	firstname:string;
	lastname:string;
	message:string;
}

class App extends React.Component<{},State> {
	
	state:State = {
		firstname:"",
		lastname:"",
		message:"No message yet"
	}
	
	greet = (firstname:string,lastname:string) => {
		this.setState({
			firstname:firstname,
			lastname:lastname,
			message:"Hello"
		})
	}
	
	render() {
	  return (
		<div className="App">
			<h2>Message:{this.state.message} {this.state.firstname} {this.state.lastname}</h2>
			<NameForm greet={this.greet}/>
		</div>
	  );
	}
}

export default App;
