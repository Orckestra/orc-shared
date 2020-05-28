import React from "react";
import { mount } from "unexpected-reaction";
import sinon from "sinon";
import { withInfiniteScroll, getOnScroll } from "./withInfiniteScroll";

const getFakeEvent = scrollTop => {
	const elm = {
		offsetHeight: 200,
		scrollHeight: 600,
		scrollTop: scrollTop,
	};
	return { type: "scroll", target: elm };
};

const TestComp = props => (
	<div>
		{"{\n  " +
			Object.entries(props)
				.map(
					([prop, value]) =>
						prop +
						": " +
						(typeof value === "function"
							? "function"
							: typeof value === "string"
							? '"' + value + '"'
							: value),
				)
				.join(",\n  ") +
			"\n}"}
	</div>
);

describe("withInfiniteScroll", () => {
	it("enhances a component to have an onScroll handler and a scrollTop prop, and sets `virtual` flag", () =>
		expect(withInfiniteScroll, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp />,
				"when mounted",
				"to have text",
				expect
					.it("to contain", "scrollTop: 0")
					.and("to contain", "virtual: true")
					.and("to contain", "onScroll: function"),
			),
		));

	describe.skip("scroll prop updates", () => {
		// jsdom does not appear to support scroll events and values as of 2019-12
		let ScrollComp;
		beforeEach(() => {
			ScrollComp = withInfiniteScroll(TestComp);
		});

		it("updates the scrollTop prop", () => {
			const onScroll = sinon.spy().named("onScroll");
			const element = mount(<ScrollComp onScroll={onScroll} />);
			expect(element, "to have text", expect.it("to contain", "scrollTop: 0"));
			element.scrollTop = 100;
			element.dispatchEvent(new window.Event("scroll"));
			expect(onScroll, "was called");
			expect(element, "to have text", expect.it("to contain", "scrollTop: 100"));
		});
	});

	describe("onScroll", () => {
		let onScroll, loader, oldOnScroll;
		beforeEach(() => {
			loader = sinon.spy().named("loader");
			oldOnScroll = sinon.spy().named("oldOnScroll");
			onScroll = getOnScroll(
				{},
				{
					onScroll: oldOnScroll,
					length: 10,
					latestPage: 1,
					pageLength: 10,
					scrollLoader: loader,
				},
			);
		});

		it("has default values", () => {
			onScroll = getOnScroll(
				{},
				{
					scrollLoader: loader,
				},
			);
			const fakeEvent = getFakeEvent(100);
			return expect(onScroll, "called with", [fakeEvent]).then(() =>
				expect(loader, "was not called"),
			);
		});

		it("does not call loader if not scrolled far enough", () => {
			const fakeEvent = getFakeEvent(100);
			return expect(onScroll, "called with", [fakeEvent])
				.then(() => expect(loader, "was not called"))
				.then(() =>
					expect(oldOnScroll, "to have calls satisfying", [{ args: [fakeEvent] }]),
				);
		});

		it("calls the loader if scrolled far enough", () => {
			const fakeEvent = getFakeEvent(350);
			return expect(onScroll, "called with", [fakeEvent])
				.then(() => expect(loader, "to have calls satisfying", [{ args: [2] }]))
				.then(() =>
					expect(oldOnScroll, "to have calls satisfying", [{ args: [fakeEvent] }]),
				);
		});

		it("does not call the loader if the latest page is not loaded", () => {
			onScroll = getOnScroll(
				{},
				{
					onScroll: oldOnScroll,
					length: 10,
					latestPage: 2,
					pageLength: 10,
					scrollLoader: loader,
				},
			);
			return expect(onScroll, "called with", [getFakeEvent(350)]).then(() =>
				expect(loader, "was not called"),
			);
		});

		it("does not call the loader if a partial page is loaded", () => {
			onScroll = getOnScroll(
				{},
				{
					onScroll: oldOnScroll,
					length: 10,
					latestPage: 2,
					pageLength: 7,
					scrollLoader: loader,
				},
			);
			return expect(onScroll, "called with", [getFakeEvent(350)]).then(() =>
				expect(loader, "was not called"),
			);
		});
	});
});
