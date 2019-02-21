import React from "react";
import { Route, Switch } from "react-router-dom";
import Spritesheet from "./Spritesheet";

/* TODO: Reset to a simple passthrough component for production */
const DevPages = ({ children }) => (
	<Switch>
		<Route path="/dev/sprites" component={Spritesheet} />
		<Route render={() => children} />
	</Switch>
);

export default DevPages;
