import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import sinon from "sinon";
import { withInfiniteScroll } from "./withInfiniteScroll";

const getFakeEvent = scrollTop => {
	const elm = {
		offsetHeight: 200,
		scrollHeight: 600,
		scrollTop: scrollTop,
	};
	return { target: elm };
};

const TestComp = () => <div />;

describe("withInfiniteScroll", () => {
	it("enhances a component to have an onScroll handler and a scrollTop prop", () =>
		expect(withInfiniteScroll, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp />,
				"to render as",
				<TestComp
					onScroll={expect.it("to be a function")}
					scrollTop={0}
					virtual
				/>,
			),
		));

	describe("scroll prop updates", () => {
		let ScrollComp;
		beforeEach(() => {
			ScrollComp = withInfiniteScroll(TestComp);
		});

		it("updates the scrollTop prop on children", () =>
			expect(<ScrollComp />, "when rendered")
				.then(render =>
					expect(render, "to have rendered", <TestComp scrollTop={0} />),
				)
				.then(render =>
					expect(
						render,
						"with event scroll",
						getFakeEvent(100),
						"to have rendered",
						<TestComp scrollTop={100} />,
					),
				));
	});

	describe("onScroll", () => {
		let ScrollComp, onScroll, loader, oldOnScroll;
		beforeEach(() => {
			loader = sinon.spy().named("loader");
			oldOnScroll = sinon.spy().named("oldOnScroll");
			ScrollComp = withInfiniteScroll(TestComp);
			const renderer = new ShallowRenderer();
			renderer.render(
				<ScrollComp
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
				.then(() => expect(loader, "to have calls satisfying", [{ args: [2] }]))
				.then(() =>
					expect(oldOnScroll, "to have calls satisfying", [
						{ args: [fakeEvent] },
					]),
				);
		});

		it("does not call the loader if the latest page is not loaded", () =>
			expect(
				<ScrollComp
					length={10}
					latestPage={2}
					pageLength={10}
					scrollLoader={loader}
				/>,
				"when rendered",
				"queried for",
				<TestComp />,
				"to have rendered",
				<TestComp onScroll={expect.it("called with", [getFakeEvent(350)])} />,
			).then(() => expect(loader, "was not called")));

		it("does not call the loader if a partial page is loaded", () =>
			expect(
				<ScrollComp
					length={10}
					latestPage={2}
					pageLength={7}
					scrollLoader={loader}
				/>,
				"to render as",
				<TestComp onScroll={expect.it("called with", [getFakeEvent(350)])} />,
			).then(() => expect(loader, "was not called")));
	});
});
