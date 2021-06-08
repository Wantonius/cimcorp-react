import React from 'react';
import './App.css';
import HotelList from './components/HotelList';
import Navbar from './components/Navbar';
import HotelForm from './components/HotelForm';
import Details from './components/Details';
import {Route,Switch} from 'react-router-dom';


class App extends React.Component {

	render() {
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
}

export default App;
