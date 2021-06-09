import React from 'react';
import './App.css';
import HotelList from './components/HotelList';
import Navbar from './components/Navbar';
import HotelForm from './components/HotelForm';
import Details from './components/Details';
import {Route,Switch} from 'react-router-dom';


//TODO change all components to functional components using hooks like
//useState.... and redux hooks like useDispatch and useSelector. 
//Remove all connect() and connector() functions and uses from all 
//components. Also there will be no "PropsFromRedux" as such with hooks.
//If you are fast as a bonus check out the react-router-dom hooks
//and change from withRouter-hoc in Details.tsx to correct router-hook for
//navigating (hint: its useParams)

//https://reactrouter.com/web/api/Hooks

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
