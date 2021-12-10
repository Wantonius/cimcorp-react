import React,{useState,useEffect} from 'react';
import LoggingContext,{LogLevels} from './LoggingContext';



interface State {
	url:string,
	request:{}
}

const Logger:React.FC<{}> = (props) => {
	
	const [loglevels,] = useState<LogLevels>({
		loglevels:{
			LOG_ALL:"LOG_ALL",
			LOG_DEBUG:"LOG_DEBUG",
			LOG_INFO:"LOG_INFO",
			LOG_WARN:"LOG_WARN",
			LOG_ERROR:"LOG_ERROR",
			LOG_FATAL:"LOG_FATAL"
		}
	})
	
	const [state,setState] = useState<State>({
		url:"",
		request:{}			
	})
	
	useEffect(() => {
		
		const fetchLog = async () => {
			const response = await fetch(state.url,state.request)
			if(response.ok) {
				console.log("logged")
			}
		}
		
		fetchLog();
	} ,[state])
	
	const setLog = (severity:string,tag:string,desc:string) => {
		setState({
			url:"/hoclog",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify({
					severity:severity,
					tag:tag,
					desc:desc
				})
			}
		})
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