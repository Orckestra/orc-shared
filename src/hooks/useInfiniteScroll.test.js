import React from "react";
import { TestWrapper } from "./../utils/testUtils";
import { mount } from "enzyme";
import useInfiniteScroll from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
	const entities = Array.from("AnArrayOfEntities");

	const TestComp = ({ countOffset }) => {
		const [visibleEntities, scrollEvent] = useInfiniteScroll(entities, 3, countOffset);

		return (
			<div>
				<div id="entityCount">{visibleEntities.length}</div>
				<div id="scrollIt" onClick={evt => scrollEvent(evt)} />
			</div>
		);
	};

	it("return the initial number of visible entities", () => {
		const component = (
			<TestWrapper>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const fieldValue = mountedComponent.find("#entityCount").prop("children");

		expect(fieldValue, "to equal", 3);
	});

	it("return the same number of visible entities after small scrolling", () => {
		const component = (
			<TestWrapper>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scroller = mountedComponent.find("#scrollIt");

		scroller.invoke("onClick")({ target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 } });

		const fieldValue = mountedComponent.find("#entityCount").prop("children");

		expect(fieldValue, "to equal", 3);
	});

	it("return the number of visible entities after scrolling", () => {
		const component = (
			<TestWrapper>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scroller = mountedComponent.find("#scrollIt");

		scroller.invoke("onClick")({ target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 900 } });

		const fieldValue = mountedComponent.find("#entityCount").prop("children");

		expect(fieldValue, "to equal", 6);
	});

	it("return the number of visible entities after scrolling with a count offset", () => {
		const component = (
			<TestWrapper>
				<TestComp countOffset={2} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scroller = mountedComponent.find("#scrollIt");

		scroller.invoke("onClick")({ target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 900 } });

		const fieldValue = mountedComponent.find("#entityCount").prop("children");

		expect(fieldValue, "to equal", 8);
	});
});
