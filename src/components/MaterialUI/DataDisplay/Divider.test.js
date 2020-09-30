import React from "react";
import { mount, shallow } from "enzyme";
import Divider from "./Divider";
import DividerProps from "./dividerProps";
import { ignoreConsoleError } from "~/utils/testUtils";

describe("Divider", () => {
	it("Renders divider", () => {
		const component = <Divider />;

		const mountedComponent = mount(component);
		const expected = <hr />;

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Use orientation property and make line vertical one", () => {
		const dividerProps = new DividerProps();
		const orientation = "vertical";
		dividerProps.set(DividerProps.propNames.orientation, orientation);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiDivider-vertical"), "to be true");
	});

	it("Use light property and make line light one", () => {
		const dividerProps = new DividerProps();
		dividerProps.set(DividerProps.propNames.light, true);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiDivider-light"), "to be true");
	});

	it("Use variant property to change horizontal line variant", () => {
		const dividerProps = new DividerProps();
		const variant = "middle";
		dividerProps.set(DividerProps.propNames.variant, variant);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".MuiDivider-middle"), "to be true");
	});

	it("Use passes classes for root ruleName", () => {
		const dividerProps = new DividerProps();
		const testClassRoot = "testClassRoot";
		dividerProps.setStyle(DividerProps.ruleNames.root, testClassRoot);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testClassRoot"), "to be true");
	});

	it("Use passes classes for light ruleName", () => {
		const dividerProps = new DividerProps();
		const testClassLight = "testClassLight";
		dividerProps.set(DividerProps.propNames.light, true);
		dividerProps.setStyle(DividerProps.ruleNames.light, testClassLight);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testClassLight"), "to be true");
	});

	it("Use passes classes for vertical ruleName", () => {
		const dividerProps = new DividerProps();
		const testClassVertical = "testClassVertical";
		dividerProps.set(DividerProps.propNames.orientation, "vertical");
		dividerProps.setStyle(DividerProps.ruleNames.vertical, testClassVertical);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testClassVertical"), "to be true");
	});

	it("Use passes classes for middle ruleName", () => {
		const dividerProps = new DividerProps();
		const testClassMiddle = "testClassMiddle";
		dividerProps.set(DividerProps.propNames.variant, "middle");
		dividerProps.setStyle(DividerProps.ruleNames.middle, testClassMiddle);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testClassMiddle"), "to be true");
	});

	it("Use passes classes for inset ruleName", () => {
		const dividerProps = new DividerProps();
		const testClassInset = "testClassInset";
		dividerProps.set(DividerProps.propNames.variant, "inset");
		dividerProps.setStyle(DividerProps.ruleNames.inset, testClassInset);
		const component = <Divider dividerProps={dividerProps} />;

		const mountedComponent = mount(component);

		expect(mountedComponent.exists(".testClassInset"), "to be true");
	});

	it("Fails if dividerProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Divider dividerProps="Wrong Type" />;
			expect(() => mount(component), "to throw a", TypeError).then((error) => {
				expect(error, "to have message", "dividerProps property is not of type DividerProps")
			});
		});
	});

	it("Shoud use fallback values if poperties are not passed", () => {
		const component = <Divider />;
		const mountedComponent = shallow(component);

		expect(mountedComponent.prop("light"), "to equal", false);
		expect(mountedComponent.prop("orientation"), "to equal", "horizontal");
		expect(mountedComponent.prop("variant"), "to equal", "fullWidth");
	});
});
