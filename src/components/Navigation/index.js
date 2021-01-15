import React from "react";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import { useNavigationState } from "./useNavigationState";
import TabBar from "../MaterialUI/Navigation/TabBar";

// Tab lists stored to localstorage?

// Scope concern: Changing scope means subpages may no longer be valid.
// Grey out other-scoped tabs, change scope when opened?
// Warn when changing scopes, close out-scope tabs?

const Navigation = withErrorBoundary("Navigation")(({ modules }) => (
	<TabBar {...useNavigationState(modules)} />
));

export default Navigation;
