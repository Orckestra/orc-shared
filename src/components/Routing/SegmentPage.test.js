import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Text from "../Text";
import Segment from "./Segment";
import SegmentPage, { Wrapper, Item, List } from "./SegmentPage";

const View1 = () => <div />;
const View2 = () => <div />;

describe("SegmentPage", () => {
	// < Opens tab when navigated to,
	// view / segment
	// view / segment / fullpage

	// shows list of segments >
	it("shows a list of links to segments", () =>
		expect(
			<SegmentPage
				path="/:scope/meep"
				segments={{
					"/one": { label: "Text" },
					"/two": {
						label: { id: "message.translate", defaultMessage: "Translated" },
					},
				}}
				match={{ params: { scope: "foo" } }}
				location={{ pathname: "/foo/meep/two" }}
			/>,
			"to render as",
			<Wrapper>
				<List>
					<Item to="/foo/meep/one">
						<Text message="Text" />
					</Item>
					<Item to="/foo/meep/two" active>
						<Text
							message={{
								id: "message.translate",
								defaultMessage: "Translated",
							}}
						/>
					</Item>
				</List>
				<Switch />
			</Wrapper>,
		));

	it("shows the matched segment view", () =>
		expect(
			<SegmentPage
				path="/:scope/meep"
				segments={{
					"/one": { label: "foo", component: View1 },
					"/two": { label: "bar", component: View2 },
				}}
				match={{ params: { scope: "foo" } }}
				location={{ pathname: "/foo/meep/two" }}
			/>,
			"to render as",
			<Wrapper>
				<List />
				<Switch>
					<Route
						path="/:scope/meep/one"
						render={expect.it(
							"when called with",
							[{}, { params: { scope: "foo" } }],
							"to satisfy",
							<Segment
								path="/:scope/meep/one"
								config={{ label: "foo", component: View1 }}
							/>,
						)}
					/>
					<Route
						path="/:scope/meep/two"
						render={expect.it(
							"when called with",
							[{}, { params: { scope: "foo" } }],
							"to satisfy",
							<Segment
								path="/:scope/meep/two"
								config={{ label: "bar", component: View2 }}
							/>,
						)}
					/>
				</Switch>
			</Wrapper>,
		));

	it("has a catching redirect when no segment path is matched", () =>
		expect(
			<SegmentPage
				path="/:scope/meep"
				segments={{
					"/one": {},
					"/two": {},
				}}
				match={{ params: { scope: "foo" } }}
				location={{ pathname: "/foo/meep/two" }}
			/>,
			"to render as",
			<Wrapper>
				<Switch>
					<Route />
					<Route />
					<Redirect exact path="/:scope/meep" to="/foo/meep/one" />
				</Switch>
			</Wrapper>,
		));
});
