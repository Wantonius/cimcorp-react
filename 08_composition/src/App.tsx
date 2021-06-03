import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildenCard from './components/NamedChildren';

function App() {
  return (
    <div className="App">	
		<ContactCard>
			<h3>Simple Contact Card</h3>
		</ContactCard>
		<ContactCard>
			My Card
		</ContactCard>
		<NamedChildenCard
			header={<h2>Complex Contact Card</h2>}
			media={<p>Media Area</p>}
			content={<p>Content Area</p>}
		/>
		<NamedChildenCard
			header={<h2>No Media Card</h2>}
			content={<p>Content Area</p>}
		/>		
    </div>	
  );
}

export default App;
