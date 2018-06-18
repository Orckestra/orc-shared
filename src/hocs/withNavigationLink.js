import { connect } from "react-redux";
import { push } from "redux-little-router";

const isLocalHref = href => {
	const url = new URL(href, window.location);
	return href && url.origin === window.location.origin;
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
	if (isLocalHref(ownProps.href)) {
		props.onClick = event => {
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
