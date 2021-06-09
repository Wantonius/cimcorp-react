import React,{useEffect} from 'react';
import './App.css';
import HotelList from './components/HotelList';
import Navbar from './components/Navbar';
import HotelForm from './components/HotelForm';
import Details from './components/Details';
import {Route,Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {getList} from './actions/hotelActions';

const App:React.FC<{}> = () => {
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	useEffect(() => {
		dispatch(getList());
	},[])

	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Switch>	
				<Route exact path="/" render={() => 
					(<HotelList />)
				}/>
				<Route path="/form" render={() => 
					(<HotelForm />)
				}/>
				<Route path="/hotel/:id" render={() => 
					(<Details />)
				}/>
			</Switch>
		</div>
	);
	
}

export default App;
