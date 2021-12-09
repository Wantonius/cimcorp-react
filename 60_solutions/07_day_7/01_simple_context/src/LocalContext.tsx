import React from 'react';

export const localizations = {
	en: {
		type:"Type",
		count:"Count",
		price:"Price",
		add:"Add",
		remove:"Remove"
	},
	fi:{
		type:"Esine",
		count:"Määrä",
		price:"Hinta",
		add:"Lisää",
		remove:"Poista"	
	}
}

export interface Localization {
		type:string,
		count:string,
		price:string,
		add:string,
		remove:string	
}

const LocalContext = React.createContext<Localization>(localizations.en)

export default LocalContext;