import {useContext} from 'react';
import LoggingContext from '../context/LoggingContext';

const useLog = () => {

	const logger = useContext(LoggingContext);
	
	const debug = (tag:string,desc:string) => {
		logger.log(logger.loglevels.LOG_DEBUG,tag,desc);
	}
	
	const info = (tag:string,desc:string) => {
		logger.log(logger.loglevels.LOG_INFO,tag,desc);
	}
	
	const warn = (tag:string,desc:string) => {
		logger.log(logger.loglevels.LOG_WARN,tag,desc);
	}

	const error = (tag:string,desc:string) => {
		logger.log(logger.loglevels.LOG_ERROR,tag,desc);
	}
	
	const fatal = (tag:string,desc:string) => {
		logger.log(logger.loglevels.LOG_FATAL,tag,desc);
	}
	
	return {
		debug:debug,
		info:info,
		warn:warn,
		error:error,
		fatal:fatal
	}
	
}

export default useLog;