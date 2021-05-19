import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { ScrollableCustomList } from "./TransferList";
import SelectionList from "./SelectionList";
import ListItem from "@material-ui/core/ListItem";
import { extractMessages, TestWrapper } from "../../../utils/testUtils";
import sharedMessages from "../../../sharedMessages";

import { mount } from "enzyme";
import sinon from "sinon";

const messages = extractMessages(sharedMessages);

describe("SelectionList", () => {
	let list, listTitle, onChange;
	beforeEach(() => {
		list = [{ id: "id1", title: "item1" }];
		listTitle = "listTitle";
		onChange = sinon.spy().named("onChange");
	});

	it("Renders SelectionList correctly", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList listData={{ title: listTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }}>
				<Grid>
					<Grid>
						<div>{listTitle}</div>
						<ScrollableCustomList checked={[]} items={list} classes={{}} />
					</Grid>
					<Grid />
				</Grid>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders SelectionList correctly if infoPanel is supplied", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList
					listData={{ title: listTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					infoPanel={<div>Test</div>}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }}>
				<Grid>
					<Grid>
						<div>{listTitle}</div>
						<ScrollableCustomList checked={[]} items={list} classes={{}} />
					</Grid>
					<Grid>
						<hr />
					</Grid>
					<Grid>
						<div>Test</div>
					</Grid>
				</Grid>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls onChange when item click", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList listData={{ title: listTitle, data: list }} onChange={onChange} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let item = mountedComponent.find(ListItem).at(0);
		item.invoke("onClick")();

		expect(onChange, "to have calls satisfying", [{ args: [{ selectedItems: [list[0]] }] }]);
	});

	it("handle scrolling event", () => {
		const onScroll = sinon.spy().named("onScroll");

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList
					listData={{ title: listTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					currentTotal={20}
					currentPage={1}
					onScroll={onScroll}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const paper = mountedComponent.find(Paper).at(0);

		paper.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 },
		});

		expect(onScroll, "was not called");

		paper.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 860, offsetHeight: 100 },
		});

		expect(onScroll, "to have calls satisfying", [{ args: [2] }]);
	});
});
