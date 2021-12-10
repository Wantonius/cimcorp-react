import React from 'react';

export interface LogLevels {
	loglevels:{
		LOG_ALL:string,
		LOG_DEBUG:string,
		LOG_INFO:string,
		LOG_WARN:string,
		LOG_ERROR:string,
		LOG_FATAL:string
		
	}
}

export interface LogFunction {
	log(severity:string,tag:string,desc:string):void
}

export interface Log extends LogLevels,LogFunction {}

const LoggingContext = React.createContext<Log>({
	loglevels:{
			LOG_ALL:"LOG_ALL",
			LOG_DEBUG:"LOG_DEBUG",
			LOG_INFO:"LOG_INFO",
			LOG_WARN:"LOG_WARN",
			LOG_ERROR:"LOG_ERROR",
		LOG_FATAL:"LOG_FATAL"
	},
	log:(severity:string,tag:string,desc:string) => {}
})

LoggingContext.displayName = "LoggingContext";

export default LoggingContext;