import React from 'react';
import {withRouter,RouteComponentProps} from 'react-router-dom';

class About extends React.Component<RouteComponentProps> {
	
	render() {
		return (
			<div>
				<h2>This is about</h2>
				<button onClick={() => this.props.history.push("/secret/123")}>Secret Page</button>
			</div>
		)
	}
}

export default withRouter(About);