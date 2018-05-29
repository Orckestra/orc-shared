import React from "react";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Spritesheet from "./Spritesheet";

/* Reset to a simple passthrough component for production */
const DevPages = ({ children }) => (
	<React.Fragment>
		<RenderFragment forRoute="/dev/sprites">
			<Spritesheet />
		</RenderFragment>
		<RenderFragment
			// forNoMatch does not appear to work right
			withConditions={route => !route.pathname.startsWith("/dev")}
		>
			{children}
		</RenderFragment>
	</React.Fragment>
);

export default DevPages;
