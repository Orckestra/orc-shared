import React from "react";

// Class components are as yet the only way to create error boundaries
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		const { boundary } = props;
		this.boundary = boundary;
		this.state = {};
	}
	componentDidCatch(error, info) {
		console.error(
			"Caught an error: " + error.message + ", at boundary " + this.boundary.name,
		);
		console.error(info.componentStack);
		this.setState({ error });
		this.boundary.handler(error, info);
	}
	render() {
		const { boundary, ...props } = this.props;
		return <boundary.component {...props} {...this.state} />;
	}
}

const withErrorBoundary = (name, handler = () => {}) => component => props => (
	<ErrorBoundary
		boundary={{
			name,
			handler,
			component,
		}}
		{...props}
	/>
);

export default withErrorBoundary;
