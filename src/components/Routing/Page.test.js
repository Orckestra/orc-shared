import React from "react";
import { Switch, Route } from "react-router";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import Page from "./Page";

const TestView = () => <div />;
const Sub1 = () => <div />;
const Sub2 = () => <div />;

describe("Page", () => {
	// < Opens tab when navigated to, takes up full view >

	// Renders itself only if path is matched exactly
	// Renders descendent pages
	it("sets out Routes to render its view and descendant pages", () =>
		// view
		// view / fullpage
		expect(
			<Page
				component={TestView}
				path="/nabble"
				pages={{
					"/foo": { component: Sub1 },
					"/bar": { component: Sub2 },
				}}
			/>,
			"to render as",
			<Switch>
				<Route exact path="/nabble" component={TestView} />
				<Route
					path="/nabble/foo"
					render={expect.it(
						"when called",
						"to satisfy",
						<FullPage path="/nabble/foo" config={{ component: Sub1 }} />,
					)}
				/>
				<Route
					path="/nabble/bar"
					render={expect.it(
						"when called",
						"to satisfy",
						<FullPage path="/nabble/bar" config={{ component: Sub2 }} />,
					)}
				/>
			</Switch>,
		));

	it("sets out Routes to render its view and subpages", () =>
		// view / subpage
		expect(
			<Page
				component={TestView}
				path="/nabble"
				subpages={{
					"/foo": { component: Sub1 },
					"/bar": { component: Sub2 },
				}}
			/>,
			"to render as",
			<Switch>
				<Route exact path="/nabble" component={TestView} />
				<Route
					path="/nabble/foo"
					render={expect.it(
						"when called",
						"to satisfy",
						<SubPage path="/nabble/foo" config={{ component: Sub1 }} />,
					)}
				/>
				<Route
					path="/nabble/bar"
					render={expect.it(
						"when called",
						"to satisfy",
						<SubPage path="/nabble/bar" config={{ component: Sub2 }} />,
					)}
				/>
			</Switch>,
		));
});
