import React from "react";
import Timeline from "./Timeline";
import TimelineProps from "./TimelineProps";
import { mount } from "enzyme";
import { ignoreConsoleError } from "~/utils/testUtils";

describe("Timeline", () => {
	it("Renders Timeline without props", () => {
		const component = <Timeline />;

		expect(component, "when mounted", "not to equal", null);
	});

	it("Renders Timeline with props", () => {
		const timelineProps = new TimelineProps();
		const component = <Timeline timelineProps={timelineProps} />;

		expect(component, "when mounted", "not to equal", null);
	});

	it("Timeline with wrong props throws error", () => {
		ignoreConsoleError(() => {
			const component = <Timeline timelineProps={"wrong"} />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "timelineProps property is not of type TimelineProps");
			});
		});
	});

	it("Renders Timeline with one content item", () => {
		const timelineProps = new TimelineProps();
		timelineProps.AddItem("content", null, null);
		const component = <Timeline timelineProps={timelineProps} />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
	});

	it("Renders Timeline with one contentOpposite item", () => {
		const timelineProps = new TimelineProps();
		timelineProps.AddItem(null, "contentOpposite", null);
		const component = <Timeline timelineProps={timelineProps} />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
	});

	it("Renders Timeline with a content and contentOpposite item", () => {
		const timelineProps = new TimelineProps();
		timelineProps.AddItem("content", "contentOpposite", null);
		const component = <Timeline timelineProps={timelineProps} />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
	});

	it("Renders Timeline with an icon item", () => {
		const timelineProps = new TimelineProps();
		timelineProps.AddItem("content", "contentOpposite", "icon");
		const component = <Timeline timelineProps={timelineProps} />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("icon"), "to be truthy");
	});
});
