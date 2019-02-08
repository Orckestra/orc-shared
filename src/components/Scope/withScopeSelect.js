import routingConnector from "../../hocs/routingConnector";
import { compose, withHandlers } from "recompose";
import UrlPattern from "url-pattern";
import { selectRoutePath, selectRouteParams } from "../../selectors/navigation";
import withNavigationLink from "../../hocs/withNavigationLink";
import { unwrapImmutable } from "../../utils";

const withHref = routingConnector((state, { id }) => {
	const pattern = new UrlPattern(selectRoutePath(state));
	const params = unwrapImmutable(selectRouteParams(state));
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
