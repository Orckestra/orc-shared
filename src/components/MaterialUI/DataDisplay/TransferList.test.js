import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TransferList, { CustomList, ScrollableCustomList } from "./TransferList";
import { mount } from "enzyme";
import sinon from "sinon";
import { extractMessages, TestWrapper } from "../../../utils/testUtils";
import sharedMessages from "../../../sharedMessages";

const messages = extractMessages(sharedMessages);

describe("TransferList", () => {
	let rightList, rightTitle, leftList, leftTitle, onChange;
	beforeEach(() => {
		rightList = [{ id: "id1", title: "item1" }];
		rightTitle = "rightTitle";
		leftList = [{ id: "id2", title: "item2" }];
		leftTitle = "leftTitle";
		onChange = sinon.spy().named("onChange");
	});

	it("Renders TransferList correctly", () => {
		const addButtonTitle = "add";
		const removeButtonTitle = "remove";

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<TransferList
					rightListData={{ title: rightTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					leftListData={{ title: leftTitle, data: leftList }}
					addButtonTitle={addButtonTitle}
					removeButtonTitle={removeButtonTitle}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }}>
				<Grid>
					<Grid>
						<div>{leftTitle}</div>
						<ScrollableCustomList checked={[]} items={leftList} classes={{}} />
					</Grid>
					<Grid>
						<Grid>
							<Button variant="outlined" size="small" disabled={true}>
								{addButtonTitle} &gt;
							</Button>
							<Button variant="outlined" size="small" disabled={true}>
								&lt; {removeButtonTitle}
							</Button>
						</Grid>
					</Grid>
					<Grid>
						<div>{rightTitle}</div>
						<Paper>
							<CustomList checked={[]} items={rightList} />
						</Paper>
					</Grid>
				</Grid>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TransferList with custom content correctly", () => {
		const TestComp = () => <div>testComponent</div>;
		const listItemFormatter = ({ title }) => <div>{title}</div>;

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<TransferList
					rightListData={{ title: rightTitle, data: rightList }}
					leftListData={{ title: leftTitle, data: leftList }}
					customLeftComponent={<TestComp />}
					listItemFormatter={listItemFormatter}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper intlProvider={{ messages }}>
				<Grid>
					<Grid>
						<div>{leftTitle}</div>
						<Paper>
							<div>
								<TestComp />
							</div>
						</Paper>
					</Grid>
					<Grid>
						<Grid>
							<Button variant="outlined" size="small" disabled={true}>
								{sharedMessages.add.defaultMessage} &gt;
							</Button>
							<Button variant="outlined" size="small" disabled={true}>
								&lt; {sharedMessages.remove.defaultMessage}
							</Button>
						</Grid>
					</Grid>
					<Grid>
						<div>{rightTitle}</div>
						<Paper>
							<List component="div" role="list">
								{rightList.map(item => (
									<ListItem>{listItemFormatter(item)}</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
				</Grid>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls onChange when item click", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<TransferList
					rightListData={{ title: rightTitle, data: rightList }}
					leftListData={{ title: leftTitle, data: leftList }}
					onChange={onChange}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let item = mountedComponent.find(ListItem).at(0);
		item.invoke("onClick")();

		const addButton = mountedComponent.find(Button).at(0);
		addButton.invoke("onClick")();

		item = mountedComponent.find(ListItem).at(1);
		item.invoke("onClick")();

		const removeButton = mountedComponent.find(Button).at(1);
		removeButton.invoke("onClick")();

		expect(onChange, "to have calls satisfying", [
			{ args: [{ right: [rightList[0], leftList[0]], left: [] }] },
			{ args: [{ right: [], left: [leftList[0], rightList[0]] }] },
		]);
	});

	it("addButton disabled because no item selected", () => {
		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<TransferList
					rightListData={{ title: rightTitle, data: rightList }}
					leftListData={{ title: leftTitle, data: leftList }}
					onChange={onChange}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let item = mountedComponent.find(ListItem).at(0);
		item.invoke("onClick")();

		item.invoke("onClick")();

		const addButton = mountedComponent.find(Button).at(0);

		expect(addButton.prop("disabled"), "to be true");
	});

	it("handle scrolling event", () => {
		const addButtonTitle = "add";
		const removeButtonTitle = "remove";

		const onScroll = sinon.spy().named("onScroll");

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<TransferList
					rightListData={{ title: rightTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					leftListData={{ title: leftTitle, data: leftList }}
					addButtonTitle={addButtonTitle}
					removeButtonTitle={removeButtonTitle}
					currentTotal={20}
					currentPage={1}
					onScroll={onScroll}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const leftSide = mountedComponent.find(Paper).at(0);

		leftSide.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 },
		});

		expect(onScroll, "was not called");

		leftSide.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 860, offsetHeight: 100 },
		});

		expect(onScroll, "to have calls satisfying", [{ args: [2] }]);
	});

	it("do not fail when onScroll is not specified", () => {
		const addButtonTitle = "add";
		const removeButtonTitle = "remove";

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<TransferList
					rightListData={{ title: rightTitle, data: [{ id: "id1", disabled: true, title: "item1" }] }}
					leftListData={{ title: leftTitle, data: leftList }}
					addButtonTitle={addButtonTitle}
					removeButtonTitle={removeButtonTitle}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const leftSide = mountedComponent.find(Paper).at(0);

		leftSide.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 },
		});
	});
});
