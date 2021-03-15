import React from "react";
import Paper from "@material-ui/core/Paper";
import ListItemMui from "@material-ui/core/ListItem";
import List, { ScrollableList } from "./List";
import { mount } from "enzyme";
import sinon from "sinon";
import { extractMessages, TestWrapper } from "../../../utils/testUtils";
import sharedMessages from "../../../sharedMessages";

const messages = extractMessages(sharedMessages);

describe("List", () => {
	let items, onChange;
	beforeEach(() => {
		items = [
			{ id: "id1", title: "item1" },
			{ id: "id2", title: "item2" },
		];
		onChange = sinon.spy().named("onChange");
	});

	it("Renders List correctly", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }} stylesProvider>
				<List items={items} onChange={onChange} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }} stylesProvider>
				<ScrollableList selected={[]} items={items} classes={{}} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls onChange when item click", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<List items={items} onChange={onChange} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let item = mountedComponent.find(ListItemMui).at(0);
		item.invoke("onClick")();

		expect(onChange, "was called");
	});

	it("handle scrolling event", () => {
		const onScroll = sinon.spy().named("onScroll");

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<List items={items} onChange={onChange} onScroll={onScroll} currentTotal={20} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const list = mountedComponent.find(Paper).at(0);

		list.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 },
		});

		expect(onScroll, "was not called");

		list.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 860, offsetHeight: 100 },
		});

		expect(onScroll, "was called");
	});

	it("do not fail when onScroll is not specified", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<List items={items} onChange={onChange} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const list = mountedComponent.find(Paper).at(0);

		list.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 },
		});
	});
});
