import React from 'react';
import {register,login} from '../actions/loginActions';
import {connect, ConnectedProps} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {LoginState} from '../types/states';


interface State {
	username:string;
	password:string;
}

const mapStateToProps = (state:LoginState) => {
	return {}
}

const mapDispatchToProps = (dispatch:ThunkDispatch<any,any,AnyAction>) => {
	return {
		login:(username:string,password:string) => dispatch(login(username,password)),
		register:(username:string,password:string) => dispatch(register(username,password))
	}
}

const connector = connect(mapStateToProps,mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class LoginPage extends React.Component<PropsFromRedux,State> {
	
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

export default connector(LoginPage);