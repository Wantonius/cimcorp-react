import React,{useState} from 'react';
import {register,login} from '../actions/loginActions';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';


interface State {
	username:string;
	password:string;
}

const LoginPage:React.FC<{}> = () =>  {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	});
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const onChange = (e:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.currentTarget.name]:e.currentTarget.value
		})
	}
	
	const onRegister = (e:React.SyntheticEvent) => {
			e.preventDefault();
			dispatch(register(state.username, state.password));		
	}
	
	const onLogin = (e:React.SyntheticEvent) => {
			e.preventDefault();
			dispatch(login(state.username, state.password));		
	}
		


	return(
		<form>
			<label htmlFor="username">Username:</label>
			<input type="text"
					name="username"
					onChange={onChange}
					value={state.username}/>
			<br/>
			<label htmlFor="password">Password:</label>
			<input type="password"
					name="password"
					onChange={onChange}
					value={state.password}/>
			<br/>
			<button onClick={onRegister}>Register</button>
			<button onClick={onLogin}>Login</button>
		</form>
	)

}

export default LoginPage;