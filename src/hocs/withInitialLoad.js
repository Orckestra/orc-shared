import { lifecycle } from "recompose";

const withInitialLoad = (loader, test = () => false) =>
	lifecycle({
		componentDidMount() {
			console.warn(
				"Higher order component withInitialLoad has been deprecated in favor of React hook useLoader",
			);
			if (test(this.props)) {
				this.props[loader]();
			}
		},
	});

export default withInitialLoad;
