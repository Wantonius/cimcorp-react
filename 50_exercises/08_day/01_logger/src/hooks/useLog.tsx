import {useContext} from 'react';
import LoggingContext from '../context/LoggingContext';

const useLog = () => {

	const logger = useContext(LoggingContext);
	
	//TODO: luodaan funktiot debug, info, warn, error ja fatal. Nämä kutsuvat loggerin log funktiota sopivalla loglevelillä.
	//Parameteriksi tag:string ja desc:string, jotka välitetään eteenpäin loggerin log funktiolle.
	//Hookki useLog siirtää nuo funktiot käyttöön komponenteille.
	
	return {
		debug:debug,
		info:info,
		warn:warn,
		error:error,
		fatal:fatal
	}
	
}

export default useLog;