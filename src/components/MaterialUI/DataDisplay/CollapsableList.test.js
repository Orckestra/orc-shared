import React from "react";
import { mount } from "enzyme";
import CollapsableList from "./CollapsableList";
import Collapse from "@material-ui/core/Collapse";
import Icon from "./Icon";
import Typography from "@material-ui/core/Typography";
import CollapsableListProps from "./collapsableListProps";
import { ignoreConsoleError } from "~/utils/testUtils";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";

describe("CollapsableList", () => {
	const defaultElement = <p>Item1</p>;
	const otherElements = (
		<>
			<p>Item2</p>
			<p>Item3</p>
			<p>Item4</p>
		</>
	);
	const openMessage = "Open";
	const closeMessage = "Close";

	const theme = createMuiTheme();

	it("Throws an error if chipProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <CollapsableList collapsableListProps="Wrong Type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "collapsableListProps property is not of type CollapsableListProps");
			});
		});
	});

	it("Renders CollapsableList in closed state correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<CollapsableList defaultElement={defaultElement} otherElements={otherElements} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{defaultElement}
					<Collapse in={false} timeout="auto">
						{otherElements}
					</Collapse>
					<div>
						<Icon color="primary" id="chevron-down" />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CollapsableList in opened state correctly", () => {
		const collapsableListProps = new CollapsableListProps();

		collapsableListProps.set(CollapsableListProps.propNames.isExpanded, true);

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<CollapsableList
					defaultElement={defaultElement}
					otherElements={otherElements}
					collapsableListProps={collapsableListProps}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{defaultElement}
					<Collapse in={true} timeout="auto">
						{otherElements}
					</Collapse>
					<div>
						<Icon color="primary" id="chevron-up" />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CollapsableList with message in closed state correctly", () => {
		const collapsableListProps = new CollapsableListProps();

		collapsableListProps.set(CollapsableListProps.propNames.hasMessage, true);
		collapsableListProps.set(CollapsableListProps.propNames.openMessage, openMessage);

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<CollapsableList
					defaultElement={defaultElement}
					otherElements={otherElements}
					collapsableListProps={collapsableListProps}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{defaultElement}
					<Collapse in={false} timeout="auto">
						{otherElements}
					</Collapse>
					<div>
						<Icon color="primary" id="chevron-down" />
						<Typography color="primary" children={openMessage} />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CollapsableList with message in opened state correctly", () => {
		const collapsableListProps = new CollapsableListProps();

		collapsableListProps.set(CollapsableListProps.propNames.isExpanded, true);
		collapsableListProps.set(CollapsableListProps.propNames.hasMessage, true);
		collapsableListProps.set(CollapsableListProps.propNames.closeMessage, closeMessage);

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<CollapsableList
					defaultElement={defaultElement}
					otherElements={otherElements}
					collapsableListProps={collapsableListProps}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{defaultElement}
					<Collapse in={true} timeout="auto">
						{otherElements}
					</Collapse>
					<div>
						<Icon color="primary" id="chevron-up" />
						<Typography color="primary" children={closeMessage} />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders CollapsableList when expand position is 'right'", () => {
		const collapsableListProps = new CollapsableListProps();

		collapsableListProps.set(CollapsableListProps.propNames.expandPosition, "right");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<CollapsableList
					defaultElement={defaultElement}
					otherElements={otherElements}
					collapsableListProps={collapsableListProps}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{defaultElement}
					<Collapse in={false} timeout="auto">
						{otherElements}
					</Collapse>
					<div className="makeStyles-floatRight">
						<Icon color="primary" id="chevron-down" />
					</div>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Changes changes open/closed state correctly on click", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<CollapsableList defaultElement={defaultElement} otherElements={otherElements} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let collapse = mountedComponent.find(Collapse);
		const expandContainer = mountedComponent.find("div").at(4);

		expect(collapse.prop("in"), "to be false");

		expandContainer.simulate("click");

		collapse = mountedComponent.find(Collapse);

		expect(collapse.prop("in"), "to be true");
	});
});
