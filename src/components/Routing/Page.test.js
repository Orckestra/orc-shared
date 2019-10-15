import React from "react";
import { Switch, Route } from "react-router";
import FullPage from "./FullPage";
import SubPage from "./SubPage";
import Page from "./Page";
import withErrorBoundary from "../../hocs/withErrorBoundary";
import withWaypointing from "./withWaypointing";

const View = () => <div />;
const ShownView = withErrorBoundary("/nabble")(withWaypointing(View));

const Sub1 = () => <div />;
const Sub2 = () => <div />;

describe("Page", () => {
	it("sets out Routes to render its view and descendant pages", () =>
		expect(
			<Page
				component={View}
				path="/nabble"
				pages={{
					"/foo": { component: Sub1 },
					"/bar": { component: Sub2 },
				}}
			/>,
			"to render as",
			<React.Fragment>
				<Switch>
					<Route
						path="/nabble/foo"
						render={expect.it(
							"when called with",
							[{ location: {}, match: {} }],
							"to satisfy",
							<FullPage path="/nabble/foo" config={{ component: Sub1 }} />,
						)}
					/>
					<Route
						path="/nabble/bar"
						render={expect.it(
							"when called with",
							[{ location: {}, match: {} }],
							"to satisfy",
							<FullPage path="/nabble/bar" config={{ component: Sub2 }} />,
						)}
					/>
					<Route
						path="/nabble"
						render={expect.it(
							"when called with",
							[{ location: {}, match: { url: "/nabble" } }],
							"to satisfy",
							<ShownView
								mapFrom="/nabble"
								location={{}}
								match={{ url: "/nabble" }}
							/>,
						)}
					/>
				</Switch>
			</React.Fragment>,
		));

	it("sets out Routes to render its view and subpages", () =>
		// view / subpage
		expect(
			<Page
				component={View}
				path="/nabble"
				subpages={{
					"/foo": { component: Sub1 },
					"/bar": { component: Sub2 },
				}}
			/>,
			"to render as",
			<React.Fragment>
				<Switch>
					<Route
						path="/nabble"
						render={expect.it(
							"when called with",
							[{ location: {}, match: { url: "/nabble" } }],
							"to satisfy",
							<ShownView mapFrom="/nabble" />,
						)}
					/>
				</Switch>
				<Switch>
					<Route
						path="/nabble/foo"
						render={expect.it(
							"when called with",
							[{ location: {}, match: {} }],
							"to satisfy",
							<SubPage root="/nabble" config={{ component: Sub1 }} />,
						)}
					/>
					<Route
						path="/nabble/bar"
						render={expect.it(
							"when called with",
							[{ location: {}, match: {} }],
							"to satisfy",
							<SubPage root="/nabble" config={{ component: Sub2 }} />,
						)}
					/>
				</Switch>
			</React.Fragment>,
		));
});
