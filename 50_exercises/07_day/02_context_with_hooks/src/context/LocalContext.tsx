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

export interface LocalizationFunction {
	changeLoc(locale:string):void
}

interface Locale extends Localization,LocalizationFunction {}
const LocalContext = React.createContext<Locale>({
	type:"Type",
	count:"Count",
	price:"Price",
	add:"Add",
	remove:"Remove",
	changeLoc:(locale:string) => {}
})

export default LocalContext;