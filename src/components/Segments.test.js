import React from "react";
import Immutable from "immutable";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { StaticRouter, Route, Switch } from "react-router-dom";
import Redirector from "./Redirector";
import Text from "./Text";
import Segments, {
	Wrapper,
	SegmentList,
	Segment,
	segmentListConditions,
} from "./Segments";

describe("Segments", () => {
	let pages, Page1, Page2, SubPage1;
	beforeEach(() => {
		Page1 = () => <div />;
		Page2 = () => <div />;
		SubPage1 = () => <div />;
		pages = {
			"/page1": {
				component: Page1,
				label: "Page 1",
				"/:sub1": {
					title: "A subpage",
					component: SubPage1,
				},
			},
			"/page2": {
				component: Page2,
				label: { id: "test.page2", defaultMessage: "Page 2" },
			},
		};
	});

	it("renders a segment list", () => {
		const segments = shallow(<Segments pages={pages} root="/Root/test" />);
		expect(
			segments
				.childAt(0)
				.matchesElement(
					<Route path="/Root/test/page1/:sub1" component={SubPage1} />,
				),
			"to be true",
		);
		expect(segments.childAt(1).matchesElement(<Route />), "to be true");

		const segmentList = segments.childAt(1).renderProp("render")();
		expect(
			segmentList.childAt(0).contains(
				<SegmentList>
					<Segment href="/Root/test/page1">
						<Text message="Page 1" />
					</Segment>
					<Segment href="/Root/test/page2">
						<Text message={{ id: "test.page2", defaultMessage: "Page 2" }} />
					</Segment>
				</SegmentList>,
			),
			"to be true",
		);
		expect(segmentList.childAt(1).is(Switch), "to be true");
		const segmentRoutes = segmentList.childAt(1);
		expect(segmentRoutes.childAt(0).props(), "to satisfy", {
			path: "/Root/test/page1",
			component: Page1,
		});
		expect(segmentRoutes.childAt(1).props(), "to satisfy", {
			path: "/Root/test/page2",
			component: Page2,
		});
		expect(segmentRoutes.childAt(2).props(), "to satisfy", {
			exact: true,
			path: "/Root/test/",
			render: expect.it("to be a function"),
		});
		expect(
			segmentRoutes
				.childAt(2)
				.renderProp("render")()
				.contains(<Redirector href="/Root/test/page1" />),
			"to be true",
		);
	});

	it("renders segment page if path is to root", () => {
		pages["/page2"].label = "Page 2";
		const store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					router: {
						pathname: "/Root/test",
					},
				}),
		};
		return expect(
			<Provider store={store}>
				<StaticRouter location="/Root/test">
					<Segments pages={pages} root="/Root/test" />
				</StaticRouter>
			</Provider>,
			"when deeply rendered",
			"to contain",
			<Wrapper />,
		);
	});

	it("renders segment page if path is to page directly under root", () => {
		pages["/page2"].label = "Page 2";
		const store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					router: {
						pathname: "/Root/test/page1",
					},
				}),
		};
		return expect(
			<Provider store={store}>
				<StaticRouter location="/Root/test/page1">
					<Segments pages={pages} root="/Root/test" />
				</StaticRouter>
			</Provider>,
			"when deeply rendered",
			"to contain",
			<Wrapper />,
		);
	});

	it("does not render segment selector if path is to page further down", () => {
		pages["/page2"].label = "Page 2";
		const store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					router: {
						pathname: "/Root/test/page1/sub",
					},
				}),
		};
		return expect(
			<Provider store={store}>
				<StaticRouter location="/Root/test/page1/sub">
					<Segments pages={pages} root="/Root/test" />
				</StaticRouter>
			</Provider>,
			"when deeply rendered",
			"not to contain",
			<Wrapper />,
		);
	});
});

describe("routing condition checker", () => {
	let root, pagePath, segPath;
	beforeEach(() => {
		root = "/Root/test";
		segPath = root + "/segment";
		pagePath = segPath + "/path";
	});

	it("checks if path is zero or one step from given root", () =>
		expect(segmentListConditions, "called with", [root]).then(segments =>
			expect(segments, "called with", [{ pathname: root }], "to be true")
				.and("called with", [{ pathname: segPath }], "to be true")
				.and("called with", [{ pathname: pagePath }], "to be false"),
		));
});
