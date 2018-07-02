import React from "react";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Text from "./Text";
import Redirector from "./Redirector";
import Segments, { Wrapper, SegmentList, Segment } from "./Segments";

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
			<Segments pages={pages} root="/foo/heh" />,
			"to render as",
			<React.Fragment>
				<RenderFragment withConditions={expect.it("to be a function")}>
					<Wrapper>
						<SegmentList>
							<Segment href="/foo/heh/page1">
								<Text message="Page 1" />
							</Segment>
							<Segment href="/foo/heh/page2">
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
							<Redirector href="/foo/heh/page1" />
						</RenderFragment>
					</Wrapper>
				</RenderFragment>
				<RenderFragment withConditions={expect.it("to be a function")}>
					<RenderFragment forRoute="/page1/:sub1">
						<SubPage1 />
					</RenderFragment>
				</RenderFragment>
			</React.Fragment>,
		));
});
