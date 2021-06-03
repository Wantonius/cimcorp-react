import React from 'react';

interface Props {
	register(username:string,password:string):void;
	login(username:string,password:string):void;
}

interface State {
	username:string;
	password:string;
}

export default class LoginPage extends React.Component<Props,State> {
	
	state:State = {
		username:"",
		password:""
	}
	
	onChange = (e:React.FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState(state);
	}
	
	onRegister = (e:React.SyntheticEvent) => {
			e.preventDefault();
			this.props.register(this.state.username, this.state.password);		
	}
	
	onLogin = (e:React.SyntheticEvent) => {
			e.preventDefault();
			this.props.login(this.state.username, this.state.password);		
	}
		

	render() {
		return(
			<form>
				<label htmlFor="username">Username:</label>
				<input type="text"
						name="username"
						onChange={this.onChange}
						value={this.state.username}/>
				<br/>
				<label htmlFor="password">Password:</label>
				<input type="password"
						name="password"
						onChange={this.onChange}
						value={this.state.password}/>
				<br/>
				<button onClick={this.onRegister}>Register</button>
				<button onClick={this.onLogin}>Login</button>
			</form>
		)
	}
}