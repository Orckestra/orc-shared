import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import sinon from "sinon";
import ScrollLoader, { Scrollbox } from "./ScrollLoader";

const getFakeEvent = scrollTop => {
	const elm = {
		offsetHeight: 200,
		scrollHeight: 600,
		scrollTop: scrollTop,
	};
	return { target: elm };
};

describe("ScrollLoader", () => {
	it("renders a scroll box with an onScroll handler", () =>
		expect(
			<ScrollLoader>
				<div id="child" />
			</ScrollLoader>,
			"to render as",
			<Scrollbox onScroll={expect.it("called with", [getFakeEvent(100)])}>
				<div id="child" />
			</Scrollbox>,
		));

	describe("onScroll", () => {
		let onScroll, loader;
		beforeEach(() => {
			loader = sinon.spy().named("loader");
			const renderer = new ShallowRenderer();
			renderer.render(
				<ScrollLoader
					length={10}
					latestPage={1}
					pageLength={10}
					scrollLoader={loader}
				/>,
			);
			onScroll = renderer.getRenderOutput().props.onScroll;
		});

		it("does nothing if not scrolled far enough", () =>
			expect(onScroll, "called with", [getFakeEvent(100)]).then(() =>
				expect(loader, "was not called"),
			));

		it("calls the loader if scrolled far enough", () =>
			expect(onScroll, "called with", [getFakeEvent(350)]).then(() =>
				expect(loader, "to have calls satisfying", [{ args: [1] }]),
			));

		it("does not call the loader if the latest page is not loaded", () =>
			expect(
				<ScrollLoader
					length={10}
					latestPage={2}
					pageLength={10}
					scrollLoader={loader}
				/>,
				"to render as",
				<Scrollbox onScroll={expect.it("called with", [getFakeEvent(350)])} />,
			).then(() => expect(loader, "was not called")));

		it("does not call the loader if a partial page is loaded", () =>
			expect(
				<ScrollLoader
					length={10}
					latestPage={2}
					pageLength={7}
					scrollLoader={loader}
				/>,
				"to render as",
				<Scrollbox onScroll={expect.it("called with", [getFakeEvent(350)])} />,
			).then(() => expect(loader, "was not called")));
	});
});
