import { connect } from "react-redux";
import { push } from "redux-little-router";

const analyzeHref = href => {
	if (!href) return {};
	const url = new URL(href, window.location);
	return {
		local: url.origin === window.location.origin,
		self: window.location.href === url.href,
	};
};

const isActiveHref = href => {
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
	const traits = analyzeHref(ownProps.href);
	if (traits.local) {
		props.onClick = traits.self
			? event => {
					event.preventDefault();
			  }
			: event => {
					event.preventDefault();
					dispatch(push(ownProps.href));
			  };
	}
	return props;
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
);
