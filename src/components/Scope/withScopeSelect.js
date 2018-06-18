import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import UrlPattern from "url-pattern";
import { routeSelector, paramSelector } from "../../selectors/route";
import withNavigationLink from "../../hocs/withNavigationLink";
import { unwrapImmutable } from "../../utils";

const withHref = connect((state, { id }) => {
	const pattern = new UrlPattern(routeSelector(state));
	const params = unwrapImmutable(paramSelector(state));
	params.scope = id;
	return {
		href: pattern.stringify(params),
	};
});

const withHideOnSelect = withHandlers({
	onClick: ({ onClick, closeSelector }) => event => {
		onClick(event);
		closeSelector(event);
	},
});

export default compose(
	withHref,
	withNavigationLink,
	withHideOnSelect,
);
