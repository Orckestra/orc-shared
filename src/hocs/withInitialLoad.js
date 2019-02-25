import { lifecycle } from "recompose";

const withInitialLoad = (loader, test = () => false) =>
	lifecycle({
		componentDidMount() {
			if (test(this.props)) {
				this.props[loader]();
			}
		},
	});

export default withInitialLoad;
