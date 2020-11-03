import React from "react";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import Bar from "./Bar";
import { useNavigationState } from "./useNavigationState";
import MuiBar from "./MuiBar";

// Tab lists stored to localstorage?

// Scope concern: Changing scope means subpages may no longer be valid.
// Grey out other-scoped tabs, change scope when opened?
// Warn when changing scopes, close out-scope tabs?

const Navigation = withErrorBoundary("Navigation")(({ modules }) => (
	<MuiBar {...useNavigationState(modules)} />
));

export default Navigation;
