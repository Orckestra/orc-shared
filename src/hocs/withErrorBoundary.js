import { lifecycle } from "recompose";

const withErrorBoundary = (boundaryName, handler = () => {}) =>
	lifecycle({
		componentDidCatch(error, info) {
			console.error(
				"Caught an error: " + error.message + ", at boundary " + boundaryName,
			);
			console.error(info.componentStack);
			this.setState({ error });
			handler(error, info);
		},
	});

export default withErrorBoundary;
