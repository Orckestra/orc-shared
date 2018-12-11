import { lifecycle } from "recompose";

const withUpdateHandler = (handlerName, test = () => false) =>
	lifecycle({
		componentDidUpdate(prevProps, prevState) {
			if (test({ ...prevProps, ...prevState }, this.props)) {
				this.props[handlerName]();
			}
		},
	});

export default withUpdateHandler;
