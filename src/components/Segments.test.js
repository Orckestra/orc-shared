import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Text from "./Text";
import Redirector from "./Redirector";
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

	it("renders a segment list", () =>
		expect(
			<Segments pages={pages} root="/Root/test" />,
			"to render as",
			<React.Fragment>
				<RenderFragment forRoute="/page1/:sub1">
					<SubPage1 />
				</RenderFragment>
				<RenderFragment withConditions={expect.it("to be a function")}>
					<Wrapper>
						<SegmentList>
							<Segment href="/Root/test/page1">
								<Text message="Page 1" />
							</Segment>
							<Segment href="/Root/test/page2">
								<Text
									message={{ id: "test.page2", defaultMessage: "Page 2" }}
								/>
							</Segment>
						</SegmentList>
						<RenderFragment forRoute="/page1">
							<Page1 />
						</RenderFragment>
						<RenderFragment forRoute="/page2">
							<Page2 />
						</RenderFragment>
						<RenderFragment forRoute="/">
							<Redirector href="/Root/test/page1" />
						</RenderFragment>
					</Wrapper>
				</RenderFragment>
			</React.Fragment>,
		));

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
				<Segments pages={pages} root="/Root/test" />
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
				<Segments pages={pages} root="/Root/test" />
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
				<Segments pages={pages} root="/Root/test" />
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
