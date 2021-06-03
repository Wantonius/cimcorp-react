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
	
	onChange = (e:FormEvent<HTMLInputElement>) => {
		let state:any = {};
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState(state);
	}
	
	onSubmit = (e:React.SyntheticEvent) => {
		if(e.target.name === "register") {
			this.props.register(this.props.username, this.props.password);
		} else {
			this.props.login(this.props.username, this.props.password);
		}
	}

	render() {
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
				<button onClick={this.onSubmit} name="register">Register</button>
				<button onClick={this.onSubmit} name="login">Login</button>
			</form>
		
	}
}