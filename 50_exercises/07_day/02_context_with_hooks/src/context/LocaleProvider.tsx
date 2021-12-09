import React,{useState} from 'react';
import LocalContext,{localizations,Localization} from './LocalContext';

interface Location {
	lo:Localization
}

const LocaleProvider:React.FC<{}> = (props) => {

	//TODO: Toteuta lokalisaatiotila sekä changeLoc funktio LocaleProviderissä. 
	return(
		<LocalContext.Provider value={{
			//TODO: Lisää tarvittavat tiedot Providerin valueen, jotta lokalisaatiotiedot menevät komponenteille sekä lokalisaatiota voi muuttaa
		}}>
		{props.children}
		</LocalContext.Provider>
	)
}

export default LocaleProvider;