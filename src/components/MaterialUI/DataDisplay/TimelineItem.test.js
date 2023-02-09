import React from "react";
import TimelineItem from "./TimelineItem";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { mount } from "enzyme";

describe("TimelineItem", () => {
	it("Renders Timeline without items", () => {
		const component = <TimelineItem />;

		expect(component, "when mounted", "not to equal", null);
	});

	it("Renders TimelineItem with content", () => {
		const component = <TimelineItem content="content" />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
	});

	it("Renders TimelineItem with contentOpposite", () => {
		const component = <TimelineItem contentOpposite="contentOpposite" />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
	});

	it("Renders TimelineItem with a content and contentOpposite", () => {
		const component = <TimelineItem content="content" contentOpposite="contentOpposite" />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
	});

	it("Renders TimelineItem with an icon", () => {
		const component = <TimelineItem content="content" contentOpposite="contentOpposite" icon="icon" />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("icon"), "to be truthy");
	});

	it("Renders TimelineItem with outlined", () => {
		const component = <TimelineItem content="content" contentOpposite="contentOpposite" icon="icon" outlined={true} />;

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("icon"), "to be truthy");
	});

	it("Renders TimelineItem with TimelineConnector", () => {
		const component = (
			<TimelineItem content="content" contentOpposite="contentOpposite" icon="icon" outlined={true} connector={true} />
		);

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("icon"), "to be truthy");
		expect(mountedComponent.containsMatchingElement(<TimelineConnector />), "to be truthy");
	});

	it("Renders TimelineItem without TimelineConnector", () => {
		const component = (
			<TimelineItem content="content" contentOpposite="contentOpposite" icon="icon" outlined={true} connector={false} />
		);

		const mountedComponent = mount(component);
		expect(mountedComponent.containsMatchingElement("content"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("contentOpposite"), "to be truthy");
		expect(mountedComponent.containsMatchingElement("icon"), "to be truthy");
		expect(mountedComponent.containsMatchingElement(<TimelineConnector />), "to be false");
	});
});
