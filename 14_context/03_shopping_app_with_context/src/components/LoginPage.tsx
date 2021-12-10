import React,{useState} from 'react';
import useAction from '../hooks/useAction';

interface State {
	username:string,
	password:string
}

const LoginPage:React.FC<{}> = () => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const {register,login} = useAction();
	
	const onChange =(e:React.FormEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.currentTarget.name]:e.currentTarget.value
		})
	}
	
	const onRegister = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let user = {
			username:state.username,
			password:state.password
		}
		register(user);
	}
	
	const onLogin = (e:React.SyntheticEvent) => {
		e.preventDefault();
		let user = {
			username:state.username,
			password:state.password
		}
		login(user);
	}
	
	return(
		<form>
			<label htmlFor="username">Username</label>
			<input type="text"
					name="username"
					onChange={onChange}
					value={state.username}/>
			<br/>
			<label htmlFor="password">Password</label>
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