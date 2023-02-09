import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { ScrollableCustomList } from "./TransferList";
import SelectionList from "./SelectionList";
import ListItem from "@mui/material/ListItem";
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
						<div>
							<div>{listTitle}</div>
							<ScrollableCustomList checked={[]} items={list} classes={{}} />
						</div>
					</Grid>
					<Grid>
						<div></div>
					</Grid>
				</Grid>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders SelectionList correctly with multiSelect", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList
					listData={{ title: listTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					multiSelect={true}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }}>
				<Grid>
					<Grid>
						<div>
							<div>{listTitle}</div>
							<ScrollableCustomList checked={[]} items={list} classes={{}} />
						</div>
					</Grid>
					<Grid>
						<div></div>
					</Grid>
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
			<Grid>
				<Grid>
					<div>
						<div>{listTitle}</div>
						<ScrollableCustomList checked={[]} items={list} classes={{}} />
					</div>
				</Grid>
				<Grid>
					<hr />
				</Grid>
				<Grid>
					<div>Test</div>
				</Grid>
			</Grid>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders SelectionList correctly if actionPanel is supplied", () => {
		const infoPanel = <div>Test</div>;
		const actionPanel = <div>Action</div>;
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList
					listData={{ title: listTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					infoPanel={infoPanel}
					actionPanel={actionPanel}
				/>
			</TestWrapper>
		);

		const expected = (
			<Grid>
				<Grid>
					<div>
						<div>{listTitle}</div>
						<ScrollableCustomList checked={[]} items={list} classes={{}} />
						<div>{actionPanel}</div>
					</div>
				</Grid>
				<Grid>
					<hr />
				</Grid>
				<Grid>{infoPanel}</Grid>
			</Grid>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders SelectionList correctly if infoPanel is supplied without divider", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList
					listData={{ title: listTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					infoPanel={<div>Test</div>}
					divider={false}
				/>
			</TestWrapper>
		);

		const expected = (
			<Grid>
				<Grid>
					<div>
						<div>{listTitle}</div>
						<ScrollableCustomList checked={[]} items={list} classes={{}} />
					</div>
				</Grid>
				<Grid>
					<div>Test</div>
				</Grid>
			</Grid>
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

		expect(onChange.args[2][0], "to equal", { selectedItems: [list[0]] });
	});

	it("Calls onChange with defaultSelection", () => {
		const data = [
			{ id: "id1", title: "item1" },
			{ id: "id2", title: "item2" },
		];

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<SelectionList listData={{ title: listTitle, data: data }} defaultSelection={data[1].id} onChange={onChange} />
			</TestWrapper>
		);

		mount(component);

		expect(onChange.args[1][0], "to equal", { selectedItems: [data[1]] });
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
