import { lifecycle } from "recompose";

const withInitialLoad = (loader, test = () => true) =>
	lifecycle({
		componentDidMount() {
			if (test(this.props)) {
				this.props[loader]();
			}
		},
	});

export default withInitialLoad;
