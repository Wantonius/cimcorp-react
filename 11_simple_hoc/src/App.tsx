import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstButton from './components/FirstButton';
import SecondButton from './components/SecondButton';

interface State {
	message:string
}

class App extends React.Component<{},State>{
	
	state:State = {
		message:"No message yet"
	}
	
	callback = (message:string) => {
		this.setState({
			message:message
		})
	}
	render() {
		return (
			<div className="App">
				<h2>Button says:{this.state.message}</h2>
				<FirstButton callback={this.callback}/>
				<SecondButton callback={this.callback}/>
			</div>
		);
	}
}

export default App;
