import { lifecycle } from "recompose";

const withUpdateHandler = (handlerName, test = () => false) =>
	lifecycle({
		componentDidMount() {
			console.warn(
				"Higher order component withUpdateHandler has been deprecated in favor of React hook useLoader",
			);
		},
		componentDidUpdate(prevProps, prevState) {
			if (test({ ...prevProps, ...prevState }, this.props)) {
				this.props[handlerName]();
			}
		},
	});

export default withUpdateHandler;
