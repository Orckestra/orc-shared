import TimelineItemProps, { isTimelineItemProps } from "./TimelineItemProps";

describe("TimelineItemProps Props", () => {
	it("Contains necessary props keys", () => {
		const propNames = ["content", "contentOpposite", "separatorIcon"];

		expect(TimelineItemProps.propNames, "to have keys", propNames);
	});

	it("Puts keys in component props map", () => {
		const propNames = ["content", "contentOpposite", "separatorIcon"];
		const timelineItemProps = new TimelineItemProps();
		const keys = Array.from(timelineItemProps.componentProps.keys());

		expect(keys, "to equal", propNames);
	});
});

describe("isTimelineItemProps", () => {
	it("Returns true if passed value is null", () => {
		expect(isTimelineItemProps(null), "to be true");
	});

	it("Returns false if passed value is not object", () => {
		expect(isTimelineItemProps("Not object"), "to be false");
	});

	it("Returns true if passed value type is TimelineItemProps", () => {
		expect(isTimelineItemProps(new TimelineItemProps()), "to be true");
	});

	it("Returns true if passed value has property _isTimelineItemProps and it's true", () => {
		expect(isTimelineItemProps({ _isTimelineItemProps: true }), "to be true");
	});

	it("Returns false if passed value has property _isTimelineItemProps and it's false or missing", () => {
		expect(isTimelineItemProps({}), "to be false");
		expect(isTimelineItemProps({ _isTimelineItemProps: false }), "to be false");
	});
});
