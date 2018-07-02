import React from "react";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Segments, { Wrapper, SegmentList, Segment } from "./Segments";

describe("Segments", () => {
	let pages, Page1, Page2;
	beforeEach(() => {
		Page1 = () => <div />;
		Page2 = () => <div />;
		pages = {
			"/page1": {
				component: Page1,
				title: "Page 1",
			},
			"/page2": {
				component: Page2,
				title: "Page 2",
			},
		};
	});
	it("renders a segment list", () =>
		expect(
			<Segments pages={pages} root="/foo/heh" />,
			"to render as",
			<Wrapper>
				<SegmentList>
					<Segment href="/foo/heh/page1">Page 1</Segment>
					<Segment href="/foo/heh/page2">Page 2</Segment>
				</SegmentList>
				<RenderFragment forRoute="/page1">
					<Page1 />
				</RenderFragment>
				<RenderFragment forRoute="/page2">
					<Page2 />
				</RenderFragment>
			</Wrapper>,
		));
});
