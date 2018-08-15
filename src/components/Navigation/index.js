import { setDisplayName, compose } from "recompose";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import Bar from "./Bar";
import withNavigationData from "./withNavigationData";

// Tab lists stored to localstorage?

// Scope concern: Changing scope means subpages may no longer be valid.
// Grey out other-scoped tabs, change scope when opened?
// Warn when changing scopes, close out-scope tabs?

const Navigation = compose(
	withErrorBoundary("Navigation"),
	withNavigationData,
)(Bar);

export default Navigation;
