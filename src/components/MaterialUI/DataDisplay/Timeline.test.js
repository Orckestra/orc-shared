import React from "react";
import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";

describe("Timeline", () => {
	it("Renders Timeline without items", () => {
		const component = <Timeline />;

		expect(component, "when mounted", "not to equal", null);
	});

	it("Renders Timeline with one item", () => {
		const items = [<TimelineItem key="1" content="test" />];
		const component = <Timeline items={items} />;

		expect(component, "when mounted", "not to equal", null);
	});

	it("Renders Timeline with items", () => {
		const items = [<TimelineItem key="1" content="test" />, <TimelineItem key="2" content="test2" />];
		const component = <Timeline items={items} />;

		expect(component, "when mounted", "not to equal", null);
	});
});
