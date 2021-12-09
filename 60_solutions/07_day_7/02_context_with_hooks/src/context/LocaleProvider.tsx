import React,{useState} from 'react';
import LocalContext,{localizations,Localization} from './LocalContext';

interface Location {
	lo:Localization
}

const LocaleProvider:React.FC<{}> = (props) => {

	const [loc,setLoc] = useState<Location>({
		lo:localizations.en
	})

	const changeLoc = (locale:string) => {
		if(locale === "en") {
			setLoc({
				lo:localizations.en
			})
		} else {
			setLoc({
				lo:localizations.fi
			})			
		}
	}
	return(
		<LocalContext.Provider value={{
			...loc.lo,
			changeLoc:changeLoc
		}}>
		{props.children}
		</LocalContext.Provider>
	)
}

export default LocaleProvider;