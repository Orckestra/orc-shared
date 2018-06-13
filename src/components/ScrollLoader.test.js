import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import sinon from "sinon";
import ScrollLoader, { ScrollTracker, Scrollbox } from "./ScrollLoader";

const getFakeEvent = scrollTop => {
	const elm = {
		offsetHeight: 200,
		scrollHeight: 600,
		scrollTop: scrollTop,
	};
	return { target: elm };
};

const TestComp = () => <div />;

describe("ScrollLoader", () => {
	it("renders a scroll box with an onScroll handler", () =>
		expect(
			<ScrollLoader>
				<TestComp id="child" />
			</ScrollLoader>,
			"to render as",
			<ScrollTracker onScroll={expect.it("to be a function")} scrollTop={0}>
				<TestComp id="child" />
			</ScrollTracker>,
		));

	describe("scroll prop updates", () => {
		beforeEach(() => {});

		it("updates the scrollTop prop on children", () =>
			expect(
				<ScrollLoader>
					<TestComp id="child" />
				</ScrollLoader>,
				"when deeply rendered",
			)
				.then(render =>
					expect(
						render,
						"to have rendered",
						<Scrollbox>
							<TestComp id="child" scrollTop={0} />
						</Scrollbox>,
					),
				)
				.then(render =>
					expect(
						render,
						"with event scroll",
						getFakeEvent(100),
						"to have rendered",
						<Scrollbox>
							<TestComp id="child" scrollTop={100} />
						</Scrollbox>,
					),
				));
	});

	describe("onScroll", () => {
		let onScroll, loader, oldOnScroll;
		beforeEach(() => {
			loader = sinon.spy().named("loader");
			oldOnScroll = sinon.spy().named("oldOnScroll");
			const renderer = new ShallowRenderer();
			renderer.render(
				<ScrollLoader
					onScroll={oldOnScroll}
					length={10}
					latestPage={1}
					pageLength={10}
					scrollLoader={loader}
				/>,
			);
			onScroll = renderer.getRenderOutput().props.onScroll;
		});

		it("does not call loader if not scrolled far enough", () => {
			const fakeEvent = getFakeEvent(100);
			return expect(onScroll, "called with", [fakeEvent])
				.then(() => expect(loader, "was not called"))
				.then(() =>
					expect(oldOnScroll, "to have calls satisfying", [
						{ args: [fakeEvent] },
					]),
				);
		});

		it("calls the loader if scrolled far enough", () => {
			const fakeEvent = getFakeEvent(350);
			return expect(onScroll, "called with", [fakeEvent])
				.then(() => expect(loader, "to have calls satisfying", [{ args: [1] }]))
				.then(() =>
					expect(oldOnScroll, "to have calls satisfying", [
						{ args: [fakeEvent] },
					]),
				);
		});

		it("does not call the loader if the latest page is not loaded", () =>
			expect(
				<ScrollLoader
					length={10}
					latestPage={2}
					pageLength={10}
					scrollLoader={loader}
				/>,
				"when rendered",
				"queried for",
				<ScrollTracker />,
				"to have rendered",
				<ScrollTracker
					onScroll={expect.it("called with", [getFakeEvent(350)])}
				/>,
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
				<ScrollTracker
					onScroll={expect.it("called with", [getFakeEvent(350)])}
				/>,
			).then(() => expect(loader, "was not called")));
	});
});
