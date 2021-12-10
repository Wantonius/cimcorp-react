import React,{useState,useEffect} from 'react';
import LoggingContext,{LogLevels} from './LoggingContext';

interface State {
	url:string,
	request:{}
}

const Logger:React.FC<{}> = (props) => {
	
	const [loglevels,] = useState<LogLevels>({
		//TODO: lisää loglevels 
	})
	
	const [state,setState] = useState<State>({
		// TODO:lisää sopiva state
	})
	
	useEffect(() => {
		// TODO:esitellään fetchlog async funktio, joka käyttää fetchiä lisäämään login logger-backendiin. Sen jälkeen kutsutaan samaa funktiota
	} ,[state])
	
	const setLog = (severity:string,tag:string,desc:string) => {
		// TODO: asetetaan state siten, että url on "/hocloc" ja request on POST tyyppiä bodynään severity,tag ja desc. 
		//Muista header "Content-type":"application/json"
	}
		return (
			<LoggingContext.Provider value={{
				loglevels:loglevels.loglevels,
				log:setLog
			}}>
			{props.children}
			</LoggingContext.Provider>
		)	
}

export default Logger;