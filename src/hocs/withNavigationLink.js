import { push } from "connected-react-router";
import routingConnector from "./routingConnector";

const analyzeHref = href => {
	const url = new URL(href || "", window.location);
	return {
		local: url.origin === window.location.origin,
		self: window.location.href === url.href,
	};
};

const isActiveHref = (href, location) => {
	const url = new URL(href, window.location);
	return (
		href &&
		url.origin === window.location.origin &&
		window.location.pathname.substr(0, url.pathname.length) === url.pathname
	);
};

const mapStateToProps = (state, ownProps) => ({
	active: isActiveHref(ownProps.href),
});

const mapDispatchToProps = (dispatch, ownProps) => {
	const props = {};
	props.onClick = event => {
		const traits = analyzeHref(ownProps.href);
		if (traits.local) {
			event.preventDefault();
			if (!traits.self) {
				dispatch(push(ownProps.href));
			}
		}
	};
	return props;
};

export default routingConnector(mapStateToProps, mapDispatchToProps);
